import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import type { WaterGoal, WaterIntake } from "$types/fitnessTypes";

export type SQLiteDao = {
  getWaterIntakeHistory: () => Promise<WaterIntake[]>;
  getLastestWaterGoal: () => Promise<WaterGoal>;
  getWaterGoalHistory: () => Promise<WaterGoal[]>;
  addWaterIntake: (waterIntake: WaterIntake) => Promise<boolean>;
};

export function createSQLiteDao(dbConnection: SQLiteDBConnection): SQLiteDao {
  async function getWaterIntakeHistory(): Promise<WaterIntake[]> {
    await dbConnection.open();
    const waterIntakeHistoryResponse = dbConnection.query(
      "SELECT * FROM water_intake;"
    );
    await dbConnection.close();
    return (await waterIntakeHistoryResponse).values as WaterIntake[];
  }

  async function getLastestWaterGoal(): Promise<WaterGoal> {
    await dbConnection.open();
    const lastestWaterGoalResponse = dbConnection.query(
      "SELECT * FROM water_goal ORDER BY id DESC LIMIT 1;"
    );
    await dbConnection.close();
    return (await lastestWaterGoalResponse).values[0] as WaterGoal;
  }

  async function getWaterGoalHistory(): Promise<WaterGoal[]> {
    await dbConnection.open();
    const waterGoalHistoryResponse = dbConnection.query(
      "SELECT * FROM water_goal;"
    );
    await dbConnection.close();
    return (await waterGoalHistoryResponse).values as WaterGoal[];
  }

  async function addWaterIntake(waterIntake: WaterIntake): Promise<boolean> {
    await dbConnection.open();
    const addWaterIntakeResponse = dbConnection.run(
      "INSERT INTO water_intake (quantity, timeStamp) VALUES (?, ?);",
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
