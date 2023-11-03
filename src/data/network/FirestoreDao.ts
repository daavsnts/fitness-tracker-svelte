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
  doc,
  type DocumentData,
  QuerySnapshot,
  QueryDocumentSnapshot,
  updateDoc,
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
    const currentWaterGoalSnapshot = await this.getCurrentWaterGoalSnapshot();
    const currentWaterGoalDocumentData = this.getFirstDocFromSnapshot(
      currentWaterGoalSnapshot
    ).data();

    const currentWaterGoalQuantity =
      currentWaterGoalDocumentData.quantity as number;
    const currentWaterGoalTimestamp =
      currentWaterGoalDocumentData.timeStamp as Timestamp;

    const currentWaterGoal = new WaterGoal(
      currentWaterGoalQuantity,
      currentWaterGoalTimestamp.toDate()
    );

    return currentWaterGoal;
  }

  private async getCurrentWaterGoalSnapshot() {
    const q = query(
      collection(this._db, "water-goal"),
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
    await this.addWater(quantity, "water-intake");
  }

  async updateTodayWaterGoal(quantity: number) {
    const currentWaterGoalSnapshot = await this.getCurrentWaterGoalSnapshot();
    const currentWaterGoalDocument = this.getFirstDocFromSnapshot(
      currentWaterGoalSnapshot
    );
    const currentWaterGoalDocumentData = currentWaterGoalDocument.data();
    const currentWaterGoalTimestamp =
      currentWaterGoalDocumentData.timeStamp as Timestamp;

    const todayDate = new Date();
    const startOfTheDay = new Date(todayDate.setHours(0, 0, 0, 0));
    const startOfTheDayTimestamp = Timestamp.fromDate(startOfTheDay);

    if (currentWaterGoalTimestamp > startOfTheDayTimestamp) {
      await updateDoc(
        doc(this._db, "water-goal", currentWaterGoalDocument.id),
        {
          quantity: quantity,
          timeStamp: Timestamp.fromDate(new Date()),
        }
      );
    } else {
      await this.addWater(quantity, "water-goal");
    }
  }

  async addWater(quantity: number, selectedCollection: string) {
    await addDoc(collection(this._db, selectedCollection), {
      quantity: quantity,
      timeStamp: Timestamp.fromDate(new Date()),
    });
  }
}
