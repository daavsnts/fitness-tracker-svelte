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

  async getWaterIntakeHistory(userId: string): Promise<WaterIntake[]> {
    const emptyWaterIntakeHistory: WaterIntake[] = [];
    return this._utils.getHistory(
      userId,
      emptyWaterIntakeHistory,
      this._WATER_INTAKE_COLLECTION
    );
  }

  async getWaterGoalHistory(userId: string): Promise<WaterGoal[]> {
    const emptyWaterGoalHistory: WaterGoal[] = [];
    return this._utils.getHistory(
      userId,
      emptyWaterGoalHistory,
      this._WATER_GOAL_COLLECTION
    );
  }

  async getTodayWaterIntakeHistory(userId: string): Promise<WaterIntake[]> {
    const emptyTodayWaterIntakeHistory: WaterIntake[] = [];
    return this._utils.getTodayHistory(
      userId,
      emptyTodayWaterIntakeHistory,
      this._WATER_INTAKE_COLLECTION
    );
  }

  async getTotalWaterIntake(userId: string): Promise<number> {
    const totalWaterIntakeHistoryEmptyList: WaterIntake[] = [];
    const totalWaterIntakeHistory = await this._utils.getHistory(
      userId,
      totalWaterIntakeHistoryEmptyList,
      this._WATER_INTAKE_COLLECTION
    );

    const total = totalWaterIntakeHistory.reduce(
      (totalAccumulator, current) => {
        return totalAccumulator + Number(current.quantity);
      },
      0
    );

    return total;
  }

  async getTodayTotalWaterIntake(userId: string): Promise<number> {
    const todayTotalWaterIntakeHistoryEmptyList: WaterIntake[] = [];
    const todayWaterIntakeHistory = await this._utils.getTodayHistory(
      userId,
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

  async getTodayCurrentWaterGoal(userId: string): Promise<WaterGoal> {
    const todayCurrentWaterGoalDocumentData =
      await this._utils.getTodayCurrentGoalDocumentData(
        userId,
        this._WATER_GOAL_COLLECTION
      );

    if (!todayCurrentWaterGoalDocumentData) return null;

    return WaterGoalConverter.fromFirestore(todayCurrentWaterGoalDocumentData);
  }

  async updateTodayWaterGoal(userId: string, quantity: number) {
    await this._utils.updateTodayGoal(
      userId,
      quantity,
      this._WATER_GOAL_COLLECTION
    );
  }

  async addWaterIntake(userId: string, quantity: number) {
    await this._utils.addQuantity(
      userId,
      quantity,
      this._WATER_INTAKE_COLLECTION
    );
  }
}
