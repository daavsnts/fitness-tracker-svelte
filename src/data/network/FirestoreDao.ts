/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
import { TodayInterval, WaterGoal, WaterIntake } from "$types/fitnessTypes";
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

  private async getHistory<T>(historyList: T[], table: string): Promise<T[]> {
    const listSnapshot = await getDocs(collection(this._db, table));

    listSnapshot.forEach((doc) => {
      historyList.push(doc.data() as T);
    });
    return historyList;
  }

  async getTodayTotalWaterIntake(): Promise<number> {
    const todayInterval = new TodayInterval();
    const q = query(
      collection(this._db, "water-intake-log"),
      where("timeStamp", ">=", Timestamp.fromDate(todayInterval.start)),
      where("timeStamp", "<=", Timestamp.fromDate(todayInterval.end))
    );
    const todayTotalWaterIntakeSnapshot = await getDocs(q);
    let totalWaterIntake = 0;

    todayTotalWaterIntakeSnapshot.forEach((doc) => {
      totalWaterIntake += Number(doc.data().quantity);
    });
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

  async addWaterIntake(quantity: number) {
    await this.addWater(quantity, "water-intake-log");
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

  async addWater(quantity: number, selectedCollection: string) {
    await addDoc(collection(this._db, selectedCollection), {
      quantity: quantity,
      timeStamp: Timestamp.fromDate(new Date()),
    });
  }
}
