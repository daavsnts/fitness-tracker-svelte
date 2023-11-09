import type { WaterIntakeGoal, WaterIntake } from "$types/fitnessTypes";
import type { SQLiteWaterDao } from "../local/SQLiteWaterDao";

export interface WaterRepository {
  getTotalWaterIntake: () => Promise<number>;
  getTodayTotalWaterIntake: () => Promise<number>;
  getWaterIntakeHistory: () => Promise<WaterIntake[]>;
  getTodayWaterIntakeHistory: () => Promise<WaterIntake[]>;
  getLatestWaterIntakeGoal: () => Promise<WaterIntakeGoal>;
  getTodayWaterIntakeGoal: () => Promise<WaterIntakeGoal>;
  addWaterIntake: (quantity: number) => Promise<boolean>;
  updateTodayWaterIntakeGoal: (quantity: number) => Promise<boolean>;
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

  async function getLatestWaterIntakeGoal(): Promise<WaterIntakeGoal> {
    return await dao.getLatestWaterIntakeGoal();
  }

  async function getTodayWaterIntakeGoal(): Promise<WaterIntakeGoal> {
    return await dao.getTodayWaterIntakeGoal();
  }

  async function addWaterIntake(quantity: number): Promise<boolean> {
    return await dao.addWaterIntake({
      quantity: quantity,
      timeStamp: new Date(),
    } as WaterIntake);
  }

  async function updateTodayWaterIntakeGoal(quantity: number): Promise<boolean> {
    return await dao.updateTodayWaterIntakeGoal({
      quantity: quantity,
      timeStamp: new Date(),
    } as WaterIntakeGoal);
  }

  return {
    getTotalWaterIntake,
    getTodayTotalWaterIntake,
    getWaterIntakeHistory,
    getTodayWaterIntakeHistory,
    getLatestWaterIntakeGoal,
    getTodayWaterIntakeGoal,
    addWaterIntake,
    updateTodayWaterIntakeGoal,
  };
}
