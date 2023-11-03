import { WaterGoal, WaterIntake } from "$types/fitnessTypes";
import { type Firestore } from "firebase/firestore";
import { WaterGoalConverter } from "./FirestoreConverters";
import type { FirestoreDaoUtils } from "./FirestoreDaoUtils";

export class FirestoreWaterDao {
  private _db: Firestore;
  private _utils: FirestoreDaoUtils;

  constructor(db: Firestore, utils: FirestoreDaoUtils) {
    this._db = db;
    this._utils = utils;
  }

  async getWaterIntakeHistory(): Promise<WaterIntake[]> {
    const emptyWaterIntakeHistory: WaterIntake[] = [];
    return this._utils.getHistory(emptyWaterIntakeHistory, "water-intake-log");
  }

  async getWaterGoalHistory(): Promise<WaterGoal[]> {
    const emptyWaterGoalHistory: WaterGoal[] = [];
    return this._utils.getHistory(emptyWaterGoalHistory, "water-goal-log");
  }

  async getTodayTotalWaterIntake(): Promise<number> {
    const todayTotalWaterIntakeHistoryEmptyList: WaterIntake[] = [];
    const todayWaterIntakeHistory = await this._utils.getTodayHistory(
      todayTotalWaterIntakeHistoryEmptyList,
      "water-intake-log"
    );

    const todayTotal = todayWaterIntakeHistory.reduce(
      (totalAccumulator, current) => {
        return totalAccumulator + Number(current.quantity);
      },
      0
    );

    return todayTotal;
  }

  async getCurrentWaterGoal(): Promise<WaterGoal> {
    const currentWaterGoalSnapshot = await this._utils.getCurrentGoalSnapshot(
      "water-goal-log"
    );
    const currentWaterGoalDocumentData = this._utils
      .getFirstDocFromSnapshot(currentWaterGoalSnapshot)
      .data();

    return WaterGoalConverter.fromFirestore(currentWaterGoalDocumentData);
  }

  async updateTodayWaterGoal(quantity: number) {
    await this._utils.updateGoal(quantity, "water-goal-log");
  }

  async addWaterIntake(quantity: number) {
    await this._utils.addQuantity(quantity, "water-intake-log");
  }
}
