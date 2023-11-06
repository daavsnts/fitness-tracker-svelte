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
    userId: string,
    historyList: T[],
    collectionWanted: string
  ): Promise<T[]> {
    const q = query(
      collection(this._db, collectionWanted),
      where("userId", "==", userId)
    );
    const listSnapshot = await getDocs(q);

    listSnapshot.forEach((doc) => {
      historyList.push(doc.data() as T);
    });
    return historyList;
  }

  async getTodayHistory<T>(
    userId: string,
    historyList: T[],
    collectionWanted: string
  ): Promise<T[]> {
    const todayInterval = new TodayInterval();
    const q = query(
      collection(this._db, collectionWanted),
      where("userId", "==", userId),
      where("timeStamp", ">=", Timestamp.fromDate(todayInterval.start)),
      where("timeStamp", "<=", Timestamp.fromDate(todayInterval.end))
    );
    const listSnapshot = await getDocs(q);

    listSnapshot.forEach((doc) => {
      historyList.push(doc.data() as T);
    });
    return historyList;
  }

  async getTodayCurrentGoalDocumentData(
    userId: string,
    collectionWanted: string
  ) {
    const todayCurrentGoalSnapshot = await this.getTodayCurrentGoalSnapshot(
      userId,
      collectionWanted
    );

    if (todayCurrentGoalSnapshot.empty) return null;

    return this.getFirstDocFromSnapshot(todayCurrentGoalSnapshot).data();
  }

  private async getTodayCurrentGoalSnapshot(
    userId: string,
    collectionWanted: string
  ) {
    const todayInterval = new TodayInterval();
    const q = query(
      collection(this._db, collectionWanted),
      where("userId", "==", userId),
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

  async updateTodayGoal(
    userId: string,
    quantity: number,
    collectionWanted: string
  ) {
    if (quantity <= 0) throw Error("Invalid quantity!");

    const currentGoalSnapshot = await this.getTodayCurrentGoalSnapshot(
      userId,
      collectionWanted
    );

    if (currentGoalSnapshot.empty) {
      await this.addQuantity(userId, quantity, collectionWanted);
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
            userId: userId,
            quantity: quantity,
            timeStamp: Timestamp.fromDate(new Date()),
          }
        );
      } else {
        await this.addQuantity(userId, quantity, collectionWanted);
      }
    }
  }

  async addQuantity(
    userId: string,
    quantity: number,
    selectedCollection: string
  ) {
    if (quantity <= 0) throw Error("Invalid quantity!");

    await addDoc(collection(this._db, selectedCollection), {
      userId: userId,
      quantity: quantity,
      timeStamp: Timestamp.fromDate(new Date()),
    });
  }
}
