import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { type SQLiteDatabase } from "./SQLiteDatabase";
import type { WaterGoal, WaterIntake } from "$types/fitnessTypes";

export type SQLiteDao = {
  getWaterIntakeHistory: () => Promise<WaterIntake[]>;
  getLastestWaterGoal: () => Promise<WaterGoal>;
  getWaterGoalHistory: () => Promise<WaterGoal[]>;
  addWaterIntake: (waterIntake: WaterIntake) => Promise<boolean>;
};

export function createSQLiteDao(sqliteDb: SQLiteDatabase): SQLiteDao {
  const db: SQLiteDBConnection = sqliteDb.get();

  async function getWaterIntakeHistory(): Promise<WaterIntake[]> {
    await db.open();
    const waterIntakeHistoryResponse = db.query("SELECT * FROM water_intake;");
    await db.close();
    return (await waterIntakeHistoryResponse).values as WaterIntake[];
  }

  async function getLastestWaterGoal(): Promise<WaterGoal> {
    await db.open();
    const lastestWaterGoalResponse = db.query(
      "SELECT * FROM water_goal ORDER BY id DESC LIMIT 1;"
    );
    await db.close();
    return (await lastestWaterGoalResponse).values[0] as WaterGoal;
  }

  async function getWaterGoalHistory(): Promise<WaterGoal[]> {
    await db.open();
    const waterGoalHistoryResponse = db.query("SELECT * FROM water_goal;");
    await db.close();
    return (await waterGoalHistoryResponse).values as WaterGoal[];
  }

  async function addWaterIntake(waterIntake: WaterIntake): Promise<boolean> {
    await db.open();
    const addWaterIntakeResponse = db.run(
      "INSERT INTO water_intake (quantity, timeStamp) VALUES (?, ?);",
      [waterIntake.quantity, waterIntake.timeStamp]
    );
    await db.close();
    return (await addWaterIntakeResponse).changes.changes == 1;
  }

  return {
    getWaterIntakeHistory,
    getLastestWaterGoal,
    getWaterGoalHistory,
    addWaterIntake,
  };
}
