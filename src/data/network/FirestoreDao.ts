/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
import {
  Exercise,
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
import { WaterGoalConverter } from "./FirestoreConverters";

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
    const todayTotalWaterIntakeHistoryEmptyList: WaterIntake[] = [];
    const todayWaterIntakeHistory = await this.getTodayHistory(
      todayTotalWaterIntakeHistoryEmptyList,
      "water-intake-log"
    );

    const totalWaterIntake = todayWaterIntakeHistory.reduce(
      (totalWaterIntakeAccumulator, currentWaterIntake) => {
        return (
          totalWaterIntakeAccumulator + Number(currentWaterIntake.quantity)
        );
      },
      0
    );

    return totalWaterIntake;
  }

  async getCurrentWaterGoal(): Promise<WaterGoal> {
    const currentWaterGoalSnapshot = await this.getCurrentWaterGoalSnapshot();
    const currentWaterGoalDocumentData = this.getFirstDocFromSnapshot(
      currentWaterGoalSnapshot
    ).data();

    return WaterGoalConverter.fromFirestore(currentWaterGoalDocumentData);
  }

  private async getCurrentWaterGoalSnapshot() {
    const q = query(
      collection(this._db, "water-goal-log"),
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
    const currentWaterGoalSnapshot = await this.getCurrentWaterGoalSnapshot();
    const currentWaterGoalDocument = this.getFirstDocFromSnapshot(
      currentWaterGoalSnapshot
    );
    const currentWaterGoalDocumentData = currentWaterGoalDocument.data();
    const currentWaterGoalTimestamp =
      currentWaterGoalDocumentData.timeStamp as Timestamp;

    const todayInterval = new TodayInterval();

    if (currentWaterGoalTimestamp > Timestamp.fromDate(todayInterval.start)) {
      await updateDoc(
        doc(this._db, "water-goal-log", currentWaterGoalDocument.id),
        {
          quantity: quantity,
          timeStamp: Timestamp.fromDate(new Date()),
        }
      );
    } else {
      await this.addWater(quantity, "water-goal-log");
    }
  }

  async addWaterIntake(quantity: number) {
    await this.addWater(quantity, "water-intake-log");
  }

  private async addWater(quantity: number, selectedCollection: string) {
    await addDoc(collection(this._db, selectedCollection), {
      quantity: quantity,
      timeStamp: Timestamp.fromDate(new Date()),
    });
  }

  async addExercise(type: string) {
    await addDoc(collection(this._db, "exercise-log"), {
      quantity: type,
      timeStamp: Timestamp.fromDate(new Date()),
    });
  }
}
