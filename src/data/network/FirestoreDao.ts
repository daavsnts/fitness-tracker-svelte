import {
  Exercise,
  ExerciseGoal,
  WaterGoal,
  WaterIntake,
} from "$types/fitnessTypes";
import { type Firestore } from "firebase/firestore";
import { FirestoreWaterDao } from "./FirestoreWaterDao";
import { FirestoreExerciseDao } from "./FirestoreExerciseDao";
import { FirestoreDaoUtils } from "./FirestoreDaoUtils";

export class FirestoreDao {
  private _db: Firestore;
  private _utils: FirestoreDaoUtils;
  private _waterDao: FirestoreWaterDao;
  private _exerciseDao: FirestoreExerciseDao;

  constructor(db: Firestore) {
    this._db = db;
    this._utils = new FirestoreDaoUtils(this._db);
    this._waterDao = new FirestoreWaterDao(this._db, this._utils);
    this._exerciseDao = new FirestoreExerciseDao(this._db, this._utils);
  }

  async getWaterIntakeHistory(): Promise<WaterIntake[]> {
    return this._waterDao.getWaterIntakeHistory();
  }

  async getWaterGoalHistory(): Promise<WaterGoal[]> {
    return this._waterDao.getWaterGoalHistory();
  }

  async getExerciseHistory(): Promise<Exercise[]> {
    return this._exerciseDao.getExerciseHistory();
  }

  async getExerciseGoalHistory(): Promise<ExerciseGoal[]> {
    return this._exerciseDao.getExerciseGoalHistory();
  }

  async getTodayExerciseHistory(): Promise<Exercise[]> {
    return this._exerciseDao.getTodayExerciseHistory();
  }

  async getTodayTotalWaterIntake(): Promise<number> {
    return this._waterDao.getTodayTotalWaterIntake();
  }

  async getTodayTotalExercises(): Promise<number> {
    return this._exerciseDao.getTodayTotalExercises();
  }

  async getCurrentWaterGoal(): Promise<WaterGoal> {
    return this._waterDao.getCurrentWaterGoal();
  }

  async getCurrentExerciseGoal(): Promise<ExerciseGoal> {
    return this._exerciseDao.getCurrentExerciseGoal();
  }

  async updateTodayWaterGoal(quantity: number) {
    await this._waterDao.updateTodayWaterGoal(quantity);
  }

  async updateTodayExerciseGoal(quantity: number) {
    await this._exerciseDao.updateTodayExerciseGoal(quantity);
  }

  async addWaterIntake(quantity: number) {
    await this._waterDao.addWaterIntake(quantity);
  }

  async addExercise(type: string) {
    await this._exerciseDao.addExercise(type);
  }
}
