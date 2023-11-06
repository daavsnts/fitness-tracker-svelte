import { TodayInterval } from "$types/fitnessTypes";
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

export class FirestoreDaoUtils {
  private _db: Firestore;

  constructor(db: Firestore) {
    this._db = db;
  }

  async getHistory<T>(
    historyList: T[],
    collectionWanted: string
  ): Promise<T[]> {
    const listSnapshot = await getDocs(collection(this._db, collectionWanted));

    listSnapshot.forEach((doc) => {
      historyList.push(doc.data() as T);
    });
    return historyList;
  }

  async getTodayHistory<T>(
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

  async getTodayCurrentGoalDocumentData(collectionWanted: string) {
    const todayCurrentGoalSnapshot = await this.getTodayCurrentGoalSnapshot(
      collectionWanted
    );

    if (todayCurrentGoalSnapshot.empty) return null;

    return this.getFirstDocFromSnapshot(todayCurrentGoalSnapshot).data();
  }

  private async getTodayCurrentGoalSnapshot(collectionWanted: string) {
    const todayInterval = new TodayInterval();
    const q = query(
      collection(this._db, collectionWanted),
      where("timeStamp", ">=", Timestamp.fromDate(todayInterval.start)),
      where("timeStamp", "<=", Timestamp.fromDate(todayInterval.end)),
      orderBy("timeStamp", "desc"),
      limit(1)
    );
    return await getDocs(q);
  }

  getFirstDocFromSnapshot(
    snapshot: QuerySnapshot<DocumentData, DocumentData>
  ): QueryDocumentSnapshot<DocumentData, DocumentData> {
    return snapshot.docs[0];
  }

  async updateTodayGoal(quantity: number, collectionWanted: string) {
    if (quantity <= 0) throw Error("Invalid quantity!");

    const currentGoalSnapshot = await this.getTodayCurrentGoalSnapshot(
      collectionWanted
    );

    if (currentGoalSnapshot.empty) {
      await this.addQuantity(quantity, collectionWanted);
    } else {
      const currentGoalDocument =
        this.getFirstDocFromSnapshot(currentGoalSnapshot);
      const currentGoalDocumentData = currentGoalDocument.data();
      const currentGoalTimestamp =
        currentGoalDocumentData.timeStamp as Timestamp;

      const todayInterval = new TodayInterval();

      if (currentGoalTimestamp > Timestamp.fromDate(todayInterval.start)) {
        await updateDoc(
          doc(this._db, collectionWanted, currentGoalDocument.id),
          {
            quantity: quantity,
            timeStamp: Timestamp.fromDate(new Date()),
          }
        );
      } else {
        await this.addQuantity(quantity, collectionWanted);
      }
    }
  }

  async addQuantity(quantity: number, selectedCollection: string) {
    if (quantity <= 0) throw Error("Invalid quantity!");

    await addDoc(collection(this._db, selectedCollection), {
      quantity: quantity,
      timeStamp: Timestamp.fromDate(new Date()),
    });
  }
}
