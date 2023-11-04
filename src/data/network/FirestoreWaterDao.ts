import { WaterGoal, WaterIntake } from "$types/fitnessTypes";
import { type Firestore } from "firebase/firestore";
import { WaterGoalConverter } from "./FirestoreConverters";
import type { FirestoreDaoUtils } from "./FirestoreDaoUtils";

export class FirestoreWaterDao {
  private _db: Firestore;
  private _utils: FirestoreDaoUtils;
  private _WATER_INTAKE_COLLECTION = "water-intake-log";
  private _WATER_GOAL_COLLECTION = "water-goal-log";

  constructor(db: Firestore, utils: FirestoreDaoUtils) {
    this._db = db;
    this._utils = utils;
  }

  async getWaterIntakeHistory(): Promise<WaterIntake[]> {
    const emptyWaterIntakeHistory: WaterIntake[] = [];
    return this._utils.getHistory(
      emptyWaterIntakeHistory,
      this._WATER_INTAKE_COLLECTION
    );
  }

  async getWaterGoalHistory(): Promise<WaterGoal[]> {
    const emptyWaterGoalHistory: WaterGoal[] = [];
    return this._utils.getHistory(
      emptyWaterGoalHistory,
      this._WATER_GOAL_COLLECTION
    );
  }

  async getTodayWaterIntakeHistory(): Promise<WaterIntake[]> {
    const emptyTodayWaterIntakeHistory: WaterIntake[] = [];
    return this._utils.getTodayHistory(
      emptyTodayWaterIntakeHistory,
      this._WATER_INTAKE_COLLECTION
    );
  }

  async getTodayTotalWaterIntake(): Promise<number> {
    const todayTotalWaterIntakeHistoryEmptyList: WaterIntake[] = [];
    const todayWaterIntakeHistory = await this._utils.getTodayHistory(
      todayTotalWaterIntakeHistoryEmptyList,
      this._WATER_INTAKE_COLLECTION
    );

    const todayTotal = todayWaterIntakeHistory.reduce(
      (totalAccumulator, current) => {
        return totalAccumulator + Number(current.quantity);
      },
      0
    );

    return todayTotal;
  }

  async getTodayCurrentWaterGoal(): Promise<WaterGoal> {
    const todayCurrentWaterGoalDocumentData =
      await this._utils.getTodayCurrentGoalDocumentData(
        this._WATER_GOAL_COLLECTION
      );

    return WaterGoalConverter.fromFirestore(todayCurrentWaterGoalDocumentData);
  }

  async updateTodayWaterGoal(quantity: number) {
    await this._utils.updateTodayGoal(quantity, this._WATER_GOAL_COLLECTION);
  }

  async addWaterIntake(quantity: number) {
    await this._utils.addQuantity(quantity, this._WATER_INTAKE_COLLECTION);
  }
}