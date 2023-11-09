import type { WaterIntakeGoal, WaterIntake } from "$types/fitnessTypes";
import type { SQLiteDBConnection } from "@capacitor-community/sqlite";
import type { SQLiteDaoUtils } from "./SQLiteDaoUtils";

export interface SQLiteWaterDao {
  getWaterIntakeHistory: () => Promise<WaterIntake[]>;
  getTodayWaterIntakeHistory: () => Promise<WaterIntake[]>;
  getLatestWaterIntakeGoal: () => Promise<WaterIntakeGoal>;
  getTodayWaterIntakeGoal: () => Promise<WaterIntakeGoal>;
  getWaterIntakeGoalHistory: () => Promise<WaterIntakeGoal[]>;
  getTodayWaterIntakeGoalHistory: () => Promise<WaterIntakeGoal[]>;
  addWaterIntake: (waterIntake: WaterIntake) => Promise<boolean>;
  updateTodayWaterIntakeGoal: (
    waterIntakeGoal: WaterIntakeGoal
  ) => Promise<boolean>;
}

export async function createSQLiteWaterDao(
  dbConnectionPromise: Promise<SQLiteDBConnection>,
  daoUtilsPromise: Promise<SQLiteDaoUtils>
): Promise<SQLiteWaterDao> {
  const dbConnection = await dbConnectionPromise;
  const daoUtils = await daoUtilsPromise;
  const WATER_INTAKE_TABLE = "water_intake_log";
  const WATER_INTAKE_GOAL_TABLE = "water_intake_goal_log";

  async function getWaterIntakeHistory(): Promise<WaterIntake[]> {
    return await daoUtils.getHistory(WATER_INTAKE_TABLE);
  }

  async function getTodayWaterIntakeHistory(): Promise<WaterIntake[]> {
    return await daoUtils.getTodayHistory(WATER_INTAKE_TABLE);
  }

  async function getLatestWaterIntakeGoal(): Promise<WaterIntakeGoal> {
    return await daoUtils.getLatest(WATER_INTAKE_GOAL_TABLE);
  }

  async function getTodayWaterIntakeGoal(): Promise<WaterIntakeGoal> {
    return await daoUtils.getToday(WATER_INTAKE_GOAL_TABLE);
  }

  async function getWaterIntakeGoalHistory(): Promise<WaterIntakeGoal[]> {
    return await daoUtils.getHistory(WATER_INTAKE_GOAL_TABLE);
  }

  async function getTodayWaterIntakeGoalHistory(): Promise<WaterIntakeGoal[]> {
    return await daoUtils.getTodayHistory(WATER_INTAKE_GOAL_TABLE);
  }

  async function addWaterIntake(waterIntake: WaterIntake): Promise<boolean> {
    return await daoUtils.addQuantity(waterIntake, WATER_INTAKE_TABLE);
  }

  async function updateTodayWaterIntakeGoal(
    waterIntakeGoal: WaterIntakeGoal
  ): Promise<boolean> {
    return await daoUtils.updateTodayGoal(waterIntakeGoal, WATER_INTAKE_GOAL_TABLE);
  }

  return {
    getWaterIntakeHistory,
    getTodayWaterIntakeHistory,
    getLatestWaterIntakeGoal,
    getTodayWaterIntakeGoal,
    getWaterIntakeGoalHistory,
    getTodayWaterIntakeGoalHistory,
    addWaterIntake,
    updateTodayWaterIntakeGoal,
  };
}
