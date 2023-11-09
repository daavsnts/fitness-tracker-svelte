import type { WaterGoal, WaterIntake } from "$types/fitnessTypes";
import type { SQLiteDao } from "./SQLiteDao";

export interface SQLiteWaterDao {
  getWaterIntakeHistory: () => Promise<WaterIntake[]>;
  getTodayWaterIntakeHistory: () => Promise<WaterIntake[]>;
  getLatestWaterGoal: () => Promise<WaterGoal>;
  getTodayWaterGoal: () => Promise<WaterGoal>;
  getWaterGoalHistory: () => Promise<WaterGoal[]>;
  getTodayWaterGoalHistory: () => Promise<WaterGoal[]>;
  addWaterIntake: (waterIntake: WaterIntake) => Promise<boolean>;
  updateTodayWaterGoal: (waterGoal: WaterGoal) => Promise<boolean>;
}

export async function createSQLiteWaterDao(
  daoPromise: Promise<SQLiteDao>
): Promise<SQLiteWaterDao> {
  const dao = await daoPromise;
  const WATER_INTAKE_TABLE = "water_intake_log";
  const WATER_GOAL_TABLE = "water_goal_log";

  async function getWaterIntakeHistory(): Promise<WaterIntake[]> {
    return await dao.getHistory(WATER_INTAKE_TABLE);
  }

  async function getTodayWaterIntakeHistory(): Promise<WaterIntake[]> {
    return await dao.getTodayHistory(WATER_INTAKE_TABLE);
  }

  async function getLatestWaterGoal(): Promise<WaterGoal> {
    return await dao.getLatest(WATER_GOAL_TABLE);
  }

  async function getTodayWaterGoal(): Promise<WaterGoal> {
    return await dao.getToday(WATER_GOAL_TABLE);
  }

  async function getWaterGoalHistory(): Promise<WaterGoal[]> {
    return await dao.getHistory(WATER_GOAL_TABLE);
  }

  async function getTodayWaterGoalHistory(): Promise<WaterGoal[]> {
    return await dao.getTodayHistory(WATER_GOAL_TABLE);
  }

  async function addWaterIntake(waterIntake: WaterIntake): Promise<boolean> {
    return await dao.addQuantity(waterIntake, WATER_INTAKE_TABLE);
  }

  async function updateTodayWaterGoal(waterGoal: WaterGoal): Promise<boolean> {
    return await dao.updateTodayGoal(waterGoal, WATER_GOAL_TABLE);
  }

  return {
    getWaterIntakeHistory,
    getTodayWaterIntakeHistory,
    getLatestWaterGoal,
    getTodayWaterGoal,
    getWaterGoalHistory,
    getTodayWaterGoalHistory,
    addWaterIntake,
    updateTodayWaterGoal,
  };
}
