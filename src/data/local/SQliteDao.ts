import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import {
  TodayInterval,
  type WaterGoal,
  type WaterIntake,
} from "$types/fitnessTypes";

export interface SQLiteDao {
  getWaterIntakeHistory: () => Promise<WaterIntake[]>;
  getTodayWaterIntakeHistory: () => Promise<WaterIntake[]>;
  getLatestWaterGoal: () => Promise<WaterGoal>;
  getTodayLatestWaterGoal: () => Promise<WaterGoal>;
  getWaterGoalHistory: () => Promise<WaterGoal[]>;
  getTodayWaterGoalHistory: () => Promise<WaterGoal[]>;
  addWaterIntake: (waterIntake: WaterIntake) => Promise<boolean>;
  updateWaterGoal: (waterGoal: WaterGoal) => Promise<boolean>;
  updateTodayWaterGoal: (waterGoal: WaterGoal) => Promise<boolean>;
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

  async function getTodayWaterIntakeHistory(): Promise<WaterIntake[]> {
    const todayInterval = new TodayInterval();

    await dbConnection.open();
    const todayWaterIntakeHistoryResponse = dbConnection.query(
      "SELECT * FROM water_intake_log WHERE timeStamp >= ? AND timeStamp <= ?;",
      [todayInterval.start.toISOString(), todayInterval.end.toISOString()]
    );
    await dbConnection.close();
    return (await todayWaterIntakeHistoryResponse).values as WaterIntake[];
  }

  async function getLatestWaterGoal(): Promise<WaterGoal> {
    await dbConnection.open();
    const latestWaterGoalResponse = dbConnection.query(
      "SELECT * FROM water_goal_log ORDER BY timeStamp DESC LIMIT 1;"
    );
    await dbConnection.close();
    return (await latestWaterGoalResponse).values[0] as WaterGoal;
  }

  async function getTodayLatestWaterGoal(): Promise<WaterGoal> {
    const todayInterval = new TodayInterval();

    await dbConnection.open();
    const latestWaterGoalResponse = dbConnection.query(
      `SELECT * FROM water_goal_log
       WHERE timeStamp >= ? AND timeStamp <= ?
       ORDER BY timeStamp DESC LIMIT 1;`,
      [todayInterval.start.toISOString(), todayInterval.end.toISOString()]
    );
    await dbConnection.close();
    return (await latestWaterGoalResponse).values[0] as WaterGoal;
  }

  async function getWaterGoalHistory(): Promise<WaterGoal[]> {
    await dbConnection.open();
    const waterGoalHistoryResponse = dbConnection.query(
      "SELECT * FROM water_goal_log;"
    );
    await dbConnection.close();
    return (await waterGoalHistoryResponse).values as WaterGoal[];
  }

  async function getTodayWaterGoalHistory(): Promise<WaterGoal[]> {
    const todayInterval = new TodayInterval();

    await dbConnection.open();
    const waterGoalHistoryResponse = dbConnection.query(
      `SELECT * FROM water_goal_log
       WHERE timeStamp >= ? AND timeStamp <= ?;`,
      [todayInterval.start.toISOString(), todayInterval.end.toISOString()]
    );
    await dbConnection.close();
    return (await waterGoalHistoryResponse).values as WaterGoal[];
  }

  async function addWaterIntake(waterIntake: WaterIntake): Promise<boolean> {
    await dbConnection.open();
    const addWaterIntakeResponse = dbConnection.run(
      "INSERT INTO water_intake_log (quantity, timeStamp) VALUES (?, ?);",
      [waterIntake.quantity, waterIntake.timeStamp.toISOString()]
    );
    await dbConnection.close();
    return (await addWaterIntakeResponse).changes.changes == 1;
  }

  async function updateWaterGoal(waterGoal: WaterGoal): Promise<boolean> {
    const latestWaterGoal = await getLatestWaterGoal();

    if (latestWaterGoal) {
      await dbConnection.open();
      const updateWaterGoalResponse = dbConnection.run(
        `UPDATE water_goal_log
        SET quantity = ?, timeStamp = ?
          WHERE timeStamp = (SELECT MAX(timeStamp) FROM water_goal_log);`,
        [waterGoal.quantity, waterGoal.timeStamp.toISOString()]
      );
      await dbConnection.close();
      return (await updateWaterGoalResponse).changes.changes == 1;
    }

    await dbConnection.open();
    const addWaterGoalResponse = dbConnection.run(
      "INSERT INTO water_goal_log (quantity, timeStamp) VALUES (?, ?);",
      [waterGoal.quantity, waterGoal.timeStamp.toISOString()]
    );
    await dbConnection.close();
    return (await addWaterGoalResponse).changes.changes == 1;
  }

  async function updateTodayWaterGoal(waterGoal: WaterGoal): Promise<boolean> {
    const todayLatestWaterGoal = await getTodayLatestWaterGoal();

    if (todayLatestWaterGoal) {
      await dbConnection.open();
      const updateTodayWaterGoalResponse = dbConnection.run(
        `UPDATE water_goal_log
         SET quantity = ?, timeStamp = ?
         WHERE timeStamp = (SELECT MAX(timeStamp) FROM water_goal_log);`,
        [waterGoal.quantity, waterGoal.timeStamp.toISOString()]
      );
      await dbConnection.close();
      return (await updateTodayWaterGoalResponse).changes.changes == 1;
    }

    await dbConnection.open();
    const addWaterGoalResponse = dbConnection.run(
      "INSERT INTO water_goal_log (quantity, timeStamp) VALUES (?, ?);",
      [waterGoal.quantity, waterGoal.timeStamp.toISOString()]
    );
    await dbConnection.close();
    return (await addWaterGoalResponse).changes.changes == 1;
  }

  return {
    getWaterIntakeHistory,
    getTodayWaterIntakeHistory,
    getLatestWaterGoal,
    getTodayLatestWaterGoal,
    getWaterGoalHistory,
    getTodayWaterGoalHistory,
    addWaterIntake,
    updateWaterGoal,
    updateTodayWaterGoal,
  };
}
