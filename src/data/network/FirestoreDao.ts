/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
import {
  Exercise,
  ExerciseGoal,
  TodayInterval,
  WaterGoal,
  WaterIntake,
} from "$types/fitnessTypes";
import {
  collection,
  type Firestore,
  getDocs,
  where,
  query,
  Timestamp,
  orderBy,
  limit,
  addDoc,
  doc,
  type DocumentData,
  QuerySnapshot,
  QueryDocumentSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  ExerciseGoalConverter,
  WaterGoalConverter,
} from "./FirestoreConverters";

export class FirestoreDao {
  private _db: Firestore;

  constructor(db: Firestore) {
    this._db = db;
  }

  async getWaterIntakeHistory(): Promise<WaterIntake[]> {
    const emptyWaterIntakeHistory: WaterIntake[] = [];
    return this.getHistory(emptyWaterIntakeHistory, "water-intake-log");
  }

  async getWaterGoalHistory(): Promise<WaterGoal[]> {
    const emptyWaterGoalHistory: WaterGoal[] = [];
    return this.getHistory(emptyWaterGoalHistory, "water-goal-log");
  }

  async getExerciseHistory(): Promise<Exercise[]> {
    const emptyExerciseHistory: Exercise[] = [];
    return this.getHistory(emptyExerciseHistory, "exercise-log");
  }

  async getExerciseGoalHistory(): Promise<ExerciseGoal[]> {
    const emptyExerciseGoalHistory: ExerciseGoal[] = [];
    return this.getHistory(emptyExerciseGoalHistory, "exercise-goal-log");
  }

  private async getHistory<T>(historyList: T[], table: string): Promise<T[]> {
    const listSnapshot = await getDocs(collection(this._db, table));

    listSnapshot.forEach((doc) => {
      historyList.push(doc.data() as T);
    });
    return historyList;
  }

  async getTodayExerciseHistory(): Promise<Exercise[]> {
    const emptyTodayExerciseHistory: Exercise[] = [];
    return this.getTodayHistory(emptyTodayExerciseHistory, "exercise-log");
  }

  private async getTodayHistory<T>(
    historyList: T[],
    collectionWanted: string
  ): Promise<T[]> {
    const todayInterval = new TodayInterval();
    const q = query(
      collection(this._db, collectionWanted),
      where("timeStamp", ">=", Timestamp.fromDate(todayInterval.start)),
      where("timeStamp", "<=", Timestamp.fromDate(todayInterval.end))
    );
    const listSnapshot = await getDocs(q);

    listSnapshot.forEach((doc) => {
      historyList.push(doc.data() as T);
    });
    return historyList;
  }

  async getTodayTotalWaterIntake(): Promise<number> {
    return this.getTodayTotal("water-intake-log");
  }

  async getTodayTotalExercises(): Promise<number> {
    return this.getTodayTotal("exercise-log");
  }

  async getTodayTotal(collectionWanted: string): Promise<number> {
    const todayTotalHistoryEmptyList: WaterIntake[] = [];
    const todayHistory = await this.getTodayHistory(
      todayTotalHistoryEmptyList,
      collectionWanted
    );

    const todayTotal = todayHistory.reduce((totalAccumulator, current) => {
      return totalAccumulator + Number(current.quantity);
    }, 0);

    return todayTotal;
  }

  async getCurrentWaterGoal(): Promise<WaterGoal> {
    const currentWaterGoalSnapshot = await this.getCurrentGoalSnapshot(
      "water-goal-log"
    );
    const currentWaterGoalDocumentData = this.getFirstDocFromSnapshot(
      currentWaterGoalSnapshot
    ).data();

    return WaterGoalConverter.fromFirestore(currentWaterGoalDocumentData);
  }

  async getCurrentExerciseGoal(): Promise<ExerciseGoal> {
    const currentExerciseGoalSnapshot = await this.getCurrentGoalSnapshot(
      "exercise-goal-log"
    );
    const currentExerciseGoalDocumentData = this.getFirstDocFromSnapshot(
      currentExerciseGoalSnapshot
    ).data();

    return ExerciseGoalConverter.fromFirestore(currentExerciseGoalDocumentData);
  }

  private async getCurrentGoalSnapshot(collectionWanted: string) {
    const q = query(
      collection(this._db, collectionWanted),
      orderBy("timeStamp", "desc"),
      limit(1)
    );
    return await getDocs(q);
  }

  private getFirstDocFromSnapshot(
    snapshot: QuerySnapshot<DocumentData, DocumentData>
  ): QueryDocumentSnapshot<DocumentData, DocumentData> {
    let firstDoc: QueryDocumentSnapshot<DocumentData, DocumentData>;
    snapshot.forEach((doc) => {
      firstDoc = doc;
    });
    return firstDoc;
  }

  async updateTodayWaterGoal(quantity: number) {
    await this.updateGoal(quantity, "water-goal-log");
  }

  async updateTodayExerciseGoal(quantity: number) {
    await this.updateGoal(quantity, "exercise-goal-log");
  }

  private async updateGoal(quantity: number, collectionWanted: string) {
    const currentGoalSnapshot = await this.getCurrentGoalSnapshot(
      collectionWanted
    );
    const currentGoalDocument =
      this.getFirstDocFromSnapshot(currentGoalSnapshot);
    const currentGoalDocumentData = currentGoalDocument.data();
    const currentGoalTimestamp = currentGoalDocumentData.timeStamp as Timestamp;

    const todayInterval = new TodayInterval();

    if (currentGoalTimestamp > Timestamp.fromDate(todayInterval.start)) {
      await updateDoc(doc(this._db, collectionWanted, currentGoalDocument.id), {
        quantity: quantity,
        timeStamp: Timestamp.fromDate(new Date()),
      });
    } else {
      await this.addQuantity(quantity, collectionWanted);
    }
  }

  async addWaterIntake(quantity: number) {
    await this.addQuantity(quantity, "water-intake-log");
  }

  private async addQuantity(quantity: number, selectedCollection: string) {
    await addDoc(collection(this._db, selectedCollection), {
      quantity: quantity,
      timeStamp: Timestamp.fromDate(new Date()),
    });
  }

  async addExercise(type: string) {
    await addDoc(collection(this._db, "exercise-log"), {
      type: type,
      timeStamp: Timestamp.fromDate(new Date()),
    });
  }
}
