/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
import { WaterGoal, WaterIntake } from "$types/fitnessTypes";
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
} from "firebase/firestore";

export class FirestoreDao {
  private _db: Firestore;

  constructor(db: Firestore) {
    this._db = db;
  }

  async getWaterIntakeHistory(): Promise<WaterIntake[]> {
    const emptyWaterIntakeHistory: WaterIntake[] = [];
    return this.getHistory(emptyWaterIntakeHistory, "water-intake");
  }

  async getWaterGoalHistory(): Promise<WaterGoal[]> {
    const emptyWaterGoalHistory: WaterGoal[] = [];
    return this.getHistory(emptyWaterGoalHistory, "water-goal");
  }

  private async getHistory<T>(historyList: T[], table: string): Promise<T[]> {
    const listSnapshot = await getDocs(collection(this._db, table));

    listSnapshot.forEach((doc) => {
      historyList.push(doc.data() as T);
    });
    return historyList;
  }

  async getTodayTotalWaterIntake(): Promise<number> {
    const todayDate = new Date();
    const startOfTheDay = new Date(todayDate.setHours(0, 0, 0, 0));
    const endOfTheDay = new Date(todayDate.setHours(23, 59, 59, 999));
    const q = query(
      collection(this._db, "water-intake"),
      where("timeStamp", ">=", Timestamp.fromDate(startOfTheDay)),
      where("timeStamp", "<=", Timestamp.fromDate(endOfTheDay))
    );
    const todayTotalWaterIntakeSnapshot = await getDocs(q);
    let totalWaterIntake = 0;

    todayTotalWaterIntakeSnapshot.forEach((doc) => {
      totalWaterIntake += Number(doc.data().quantity);
    });
    return totalWaterIntake;
  }

  async getCurrentWaterGoal(): Promise<WaterGoal> {
    const q = query(
      collection(this._db, "water-goal"),
      orderBy("timeStamp", "desc"),
      limit(1)
    );
    const currentWaterGoalSnapshot = await getDocs(q);
    let currentWaterGoal: WaterGoal;

    currentWaterGoalSnapshot.forEach((doc) => {
      currentWaterGoal = doc.data() as WaterGoal;
    });
    return currentWaterGoal;
  }

  async addWaterIntake(quantity: number) {
    await this.addWater(quantity, "water-intake");
  }

  async addWaterGoal(quantity: number) {
    await this.addWater(quantity, "water-goal");
  }

  async addWater(quantity: number, selectedCollection: string) {
    await addDoc(collection(this._db, selectedCollection), {
      quantity: quantity,
      timeStamp: Timestamp.fromDate(new Date()),
    });
  }
}
