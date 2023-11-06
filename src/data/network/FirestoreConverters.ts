import { ExerciseGoal, WaterGoal } from "$types/fitnessTypes";
import { type DocumentData, Timestamp } from "firebase/firestore";

export class WaterGoalConverter {
  static fromFirestore(waterGoalDoc: DocumentData) {
    const quantity = waterGoalDoc.quantity as number;
    const timestamp = waterGoalDoc.timeStamp as Timestamp;
    return new WaterGoal(quantity, timestamp.toDate());
  }

  static toFirestore(userId: string, { quantity, timeStamp }: WaterGoal) {
    return {
      userId: userId,
      quantity: quantity,
      timeStamp: Timestamp.fromDate(timeStamp),
    };
  }
}

export class ExerciseGoalConverter {
  static fromFirestore(exerciseGoalDoc: DocumentData) {
    const quantity = exerciseGoalDoc.quantity as number;
    const timestamp = exerciseGoalDoc.timeStamp as Timestamp;
    return new ExerciseGoal(quantity, timestamp.toDate());
  }

  static toFirestore(userId: string, { quantity, timeStamp }: ExerciseGoal) {
    return {
      userId: userId,
      quantity: quantity,
      timeStamp: Timestamp.fromDate(timeStamp),
    };
  }
}
