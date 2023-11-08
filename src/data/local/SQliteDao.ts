import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import type { WaterGoal, WaterIntake } from "$types/fitnessTypes";

export interface SQLiteDao {
  getWaterIntakeHistory: () => Promise<WaterIntake[]>;
  getLastestWaterGoal: () => Promise<WaterGoal>;
  getWaterGoalHistory: () => Promise<WaterGoal[]>;
  addWaterIntake: (waterIntake: WaterIntake) => Promise<boolean>;
}

export async function createSQLiteDao(
  dbConnectionPromise: Promise<SQLiteDBConnection>
): Promise<SQLiteDao> {
  const dbConnection = await dbConnectionPromise;

  async function getWaterIntakeHistory(): Promise<WaterIntake[]> {
    await dbConnection.open();
    const waterIntakeHistoryResponse = dbConnection.query(
      "SELECT * FROM water_intake_log;"
    );
    await dbConnection.close();
    return (await waterIntakeHistoryResponse).values as WaterIntake[];
  }

  async function getLastestWaterGoal(): Promise<WaterGoal> {
    await dbConnection.open();
    const lastestWaterGoalResponse = dbConnection.query(
      "SELECT * FROM water_goal_log ORDER BY id DESC LIMIT 1;"
    );
    await dbConnection.close();
    return (await lastestWaterGoalResponse).values[0] as WaterGoal;
  }

  async function getWaterGoalHistory(): Promise<WaterGoal[]> {
    await dbConnection.open();
    const waterGoalHistoryResponse = dbConnection.query(
      "SELECT * FROM water_goal_log;"
    );
    await dbConnection.close();
    return (await waterGoalHistoryResponse).values as WaterGoal[];
  }

  async function addWaterIntake(waterIntake: WaterIntake): Promise<boolean> {
    await dbConnection.open();
    const addWaterIntakeResponse = dbConnection.run(
      "INSERT INTO water_intake_log (quantity, timeStamp) VALUES (?, ?);",
      [waterIntake.quantity, waterIntake.timeStamp]
    );
    await dbConnection.close();
    return (await addWaterIntakeResponse).changes.changes == 1;
  }

  return {
    getWaterIntakeHistory,
    getLastestWaterGoal,
    getWaterGoalHistory,
    addWaterIntake,
  };
}
