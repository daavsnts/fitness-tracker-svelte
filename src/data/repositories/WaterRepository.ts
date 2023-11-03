import type { WaterGoal, WaterIntake } from "$types/fitnessTypes";
import type { FirestoreDao } from "../network/FirestoreDao";

export class WaterRepository {
  private _dao: FirestoreDao;

  constructor(dao: FirestoreDao) {
    this._dao = dao;
  }

  async getWaterIntakeHistory(): Promise<WaterIntake[]> {
    return await this._dao.getWaterIntakeHistory();
  }

  async getTodayTotalWaterIntake(): Promise<number> {
    return await this._dao.getTodayTotalWaterIntake();
  }

  async getTodayWaterIntakeHistory(): Promise<WaterIntake[]> {
    return await this._dao.getTodayWaterIntakeHistory();
  }

  async getWaterGoalHistory(): Promise<WaterGoal[]> {
    return await this._dao.getWaterGoalHistory();
  }

  async getCurrentWaterGoal(): Promise<WaterGoal> {
    return await this._dao.getCurrentWaterGoal();
  }

  async updateTodayWaterGoal(quantity: number): Promise<void> {
    return await this._dao.updateTodayWaterGoal(quantity);
  }

  async addWaterIntake(quantity: number): Promise<void> {
    return await this._dao.addWaterIntake(quantity);
  }
}
