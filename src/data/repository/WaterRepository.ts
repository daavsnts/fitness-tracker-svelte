import type { WaterGoal, WaterIntake } from "$types/fitnessTypes";
import type { SQLiteDao } from "../local/SQLiteDao";

export interface WaterRepository {
  getTotalWaterIntake: () => Promise<number>;
  getWaterIntakeHistory: () => Promise<WaterIntake[]>;
  getLatestWaterGoal: () => Promise<WaterGoal>;
  addWaterIntake: (quantity: number) => Promise<boolean>;
  updateWaterGoal: (quantity: number) => Promise<boolean>;
}

export async function createWaterRepository(
  daoPromise: Promise<SQLiteDao>
): Promise<WaterRepository> {
  const dao = await daoPromise;

  async function getTotalWaterIntake(): Promise<number> {
    const waterIntakeHistory = await dao.getWaterIntakeHistory();
    return waterIntakeHistory.reduce((acc, currentValue) => {
      return acc + currentValue.quantity;
    }, 0);
  }

  async function getWaterIntakeHistory(): Promise<WaterIntake[]> {
    return await dao.getWaterIntakeHistory();
  }

  async function getLatestWaterGoal(): Promise<WaterGoal> {
    return await dao.getLatestWaterGoal();
  }

  async function addWaterIntake(quantity: number): Promise<boolean> {
    return await dao.addWaterIntake({
      quantity: quantity,
      timeStamp: new Date(),
    } as WaterIntake);
  }

  async function updateWaterGoal(quantity: number): Promise<boolean> {
    return await dao.updateWaterGoal({
      quantity: quantity,
      timeStamp: new Date(),
    } as WaterGoal);
  }

  async function updateTodayWaterGoal(quantity: number): Promise<boolean> {
    return await dao.updateTodayWaterGoal({
      quantity: quantity,
      timeStamp: new Date(),
    } as WaterGoal);
  }

  return {
    getTotalWaterIntake,
    getWaterIntakeHistory,
    getLatestWaterGoal,
    addWaterIntake,
    updateWaterGoal,
  };
}
