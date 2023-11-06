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
  private _EXERCISE_COLLECTION = "exercise-log";
  private _EXERCISE_GOAL_COLLECTION = "exercise-goal-log";

  constructor(db: Firestore, utils: FirestoreDaoUtils) {
    this._db = db;
    this._utils = utils;
  }

  async getExerciseHistory(): Promise<Exercise[]> {
    const emptyExerciseHistory: Exercise[] = [];
    return this._utils.getHistory(
      emptyExerciseHistory,
      this._EXERCISE_COLLECTION
    );
  }

  async getExerciseGoalHistory(): Promise<ExerciseGoal[]> {
    const emptyExerciseGoalHistory: ExerciseGoal[] = [];
    return this._utils.getHistory(
      emptyExerciseGoalHistory,
      this._EXERCISE_GOAL_COLLECTION
    );
  }

  async getTodayExerciseHistory(): Promise<Exercise[]> {
    const emptyTodayExerciseHistory: Exercise[] = [];
    return this._utils.getTodayHistory(
      emptyTodayExerciseHistory,
      this._EXERCISE_COLLECTION
    );
  }

  async getTodayTotalExercisesPauses(): Promise<number> {
    const todayTotalExerciseHistoryEmptyList: Exercise[] = [];
    const todayExerciseHistory = await this._utils.getTodayHistory(
      todayTotalExerciseHistoryEmptyList,
      this._EXERCISE_COLLECTION
    );

    const todayTotalExercisesPauses = todayExerciseHistory.length;
    return todayTotalExercisesPauses;
  }

  async getTodayCurrentExerciseGoal(): Promise<ExerciseGoal> {
    const todayCurrentExerciseGoalDocumentData =
      await this._utils.getTodayCurrentGoalDocumentData(
        this._EXERCISE_GOAL_COLLECTION
      );

    if (!todayCurrentExerciseGoalDocumentData) return null;

    return ExerciseGoalConverter.fromFirestore(
      todayCurrentExerciseGoalDocumentData
    );
  }

  async updateTodayExerciseGoal(quantity: number) {
    await this._utils.updateTodayGoal(quantity, this._EXERCISE_GOAL_COLLECTION);
  }

  async addExercise(type: string) {
    await addDoc(collection(this._db, this._EXERCISE_COLLECTION), {
      type: type,
      timeStamp: Timestamp.fromDate(new Date()),
    });
  }
}
