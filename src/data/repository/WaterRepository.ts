import type { WaterGoal, WaterIntake } from "$types/fitnessTypes";
import type { SQLiteWaterDao } from "../local/SQLiteWaterDao";

export interface WaterRepository {
  getTotalWaterIntake: () => Promise<number>;
  getTodayTotalWaterIntake: () => Promise<number>;
  getWaterIntakeHistory: () => Promise<WaterIntake[]>;
  getTodayWaterIntakeHistory: () => Promise<WaterIntake[]>;
  getLatestWaterGoal: () => Promise<WaterGoal>;
  getTodayWaterGoal: () => Promise<WaterGoal>;
  addWaterIntake: (quantity: number) => Promise<boolean>;
  updateTodayWaterGoal: (quantity: number) => Promise<boolean>;
}

export async function createWaterRepository(
  waterDaoPromise: Promise<SQLiteWaterDao>
): Promise<WaterRepository> {
  const dao = await waterDaoPromise;

  async function getTotalWaterIntake(): Promise<number> {
    const waterIntakeHistory = await dao.getWaterIntakeHistory();
    return waterIntakeHistory.reduce((acc, currentValue) => {
      return acc + currentValue.quantity;
    }, 0);
  }

  async function getTodayTotalWaterIntake(): Promise<number> {
    const todayWaterIntakeHistory = await dao.getTodayWaterIntakeHistory();
    return todayWaterIntakeHistory.reduce((acc, currentValue) => {
      return acc + currentValue.quantity;
    }, 0);
  }

  async function getWaterIntakeHistory(): Promise<WaterIntake[]> {
    return await dao.getWaterIntakeHistory();
  }

  async function getTodayWaterIntakeHistory(): Promise<WaterIntake[]> {
    return await dao.getTodayWaterIntakeHistory();
  }

  async function getLatestWaterGoal(): Promise<WaterGoal> {
    return await dao.getLatestWaterGoal();
  }

  async function getTodayWaterGoal(): Promise<WaterGoal> {
    return await dao.getTodayWaterGoal();
  }

  async function addWaterIntake(quantity: number): Promise<boolean> {
    return await dao.addWaterIntake({
      quantity: quantity,
      timeStamp: new Date(),
    } as WaterIntake);
  }

  async function updateTodayWaterGoal(quantity: number): Promise<boolean> {
    return await dao.updateTodayWaterGoal({
      quantity: quantity,
      timeStamp: new Date(),
    } as WaterGoal);
  }

  return {
    getTotalWaterIntake,
    getTodayTotalWaterIntake,
    getWaterIntakeHistory,
    getTodayWaterIntakeHistory,
    getLatestWaterGoal,
    getTodayWaterGoal,
    addWaterIntake,
    updateTodayWaterGoal,
  };
}
