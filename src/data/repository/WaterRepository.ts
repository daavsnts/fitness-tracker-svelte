import type { WaterGoal, WaterIntake } from "$types/fitnessTypes";
import type { SQLiteDao } from "../local/SQLiteDao";

export type WaterRepository = {
  getTotalWaterIntake: () => Promise<number>;
  getWaterIntakeHistory: () => Promise<WaterIntake[]>;
  getLatestWaterGoal: () => Promise<WaterGoal>;
  addWaterIntake: (quantity: number) => Promise<boolean>;
};

export function createWaterRepository(dao: SQLiteDao): WaterRepository {
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
    return await dao.getLastestWaterGoal();
  }

  async function addWaterIntake(quantity: number): Promise<boolean> {
    return await dao.addWaterIntake({
      quantity: quantity,
      timeStamp: Date.now(),
    } as WaterIntake);
  }

  return {
    getTotalWaterIntake,
    getWaterIntakeHistory,
    getLatestWaterGoal,
    addWaterIntake,
  };
}
