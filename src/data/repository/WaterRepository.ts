import type { WaterGoal, WaterIntake } from "$types/fitnessTypes";
import type { SQLiteDao } from "../local/SQLiteDao";

export type WaterRepository = {
  getDailyTotalWaterIntake: () => Promise<number>;
  getWaterIntakeHistory: () => Promise<WaterIntake[]>;
  getLatestWaterGoal: () => Promise<WaterGoal>;
  addWaterIntake: (quantity: number) => Promise<boolean>;
};

export function createWaterRepository(dao: SQLiteDao): WaterRepository {
  async function getDailyTotalWaterIntake(): Promise<number> {
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
      timeStamp: new Date(),
    } as WaterIntake);
  }

  return {
    getDailyTotalWaterIntake,
    getWaterIntakeHistory,
    getLatestWaterGoal,
    addWaterIntake,
  };
}
