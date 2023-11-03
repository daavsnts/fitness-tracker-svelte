import { Exercise, ExerciseGoal } from "$types/fitnessTypes";
import {
  collection,
  type Firestore,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { ExerciseGoalConverter } from "./FirestoreConverters";
import type { FirestoreDaoUtils } from "./FirestoreDaoUtils";

export class FirestoreExerciseDao {
  private _db: Firestore;
  private _utils: FirestoreDaoUtils;

  constructor(db: Firestore, utils: FirestoreDaoUtils) {
    this._db = db;
    this._utils = utils;
  }

  async getExerciseHistory(): Promise<Exercise[]> {
    const emptyExerciseHistory: Exercise[] = [];
    return this._utils.getHistory(emptyExerciseHistory, "exercise-log");
  }

  async getExerciseGoalHistory(): Promise<ExerciseGoal[]> {
    const emptyExerciseGoalHistory: ExerciseGoal[] = [];
    return this._utils.getHistory(
      emptyExerciseGoalHistory,
      "exercise-goal-log"
    );
  }

  async getTodayExerciseHistory(): Promise<Exercise[]> {
    const emptyTodayExerciseHistory: Exercise[] = [];
    return this._utils.getTodayHistory(
      emptyTodayExerciseHistory,
      "exercise-log"
    );
  }

  async getTodayTotalExercises(): Promise<number> {
    const todayTotalExerciseHistoryEmptyList: Exercise[] = [];
    const todayExerciseHistory = await this._utils.getTodayHistory(
      todayTotalExerciseHistoryEmptyList,
      "exercise-log"
    );

    const todayTotalExercises = todayExerciseHistory.length;
    return todayTotalExercises;
  }

  async getCurrentExerciseGoal(): Promise<ExerciseGoal> {
    const currentExerciseGoalSnapshot =
      await this._utils.getCurrentGoalSnapshot("exercise-goal-log");
    const currentExerciseGoalDocumentData = this._utils
      .getFirstDocFromSnapshot(currentExerciseGoalSnapshot)
      .data();

    return ExerciseGoalConverter.fromFirestore(currentExerciseGoalDocumentData);
  }

  async updateTodayExerciseGoal(quantity: number) {
    await this._utils.updateGoal(quantity, "exercise-goal-log");
  }

  async addExercise(type: string) {
    await addDoc(collection(this._db, "exercise-log"), {
      type: type,
      timeStamp: Timestamp.fromDate(new Date()),
    });
  }
}
