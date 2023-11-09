import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { TodayInterval, type Goal } from "$types/fitnessTypes";

export interface SQLiteDao {
  getHistory: <T>(table: string) => Promise<T[]>;
  getTodayHistory: <T>(table: string) => Promise<T[]>;
  getLatest: <T>(table: string) => Promise<T>;
  getToday: <T>(table: string) => Promise<T>;
  updateTodayGoal<T extends Goal>(goal: T, table: string): Promise<boolean>;
  getGoalHistory: <T extends Goal>(table: string) => Promise<T[]>;
  getTodayGoalHistory: <T extends Goal>(table: string) => Promise<T[]>;
  addQuantity: <T extends { quantity: number; timeStamp: Date }>(
    quantityObj: T,
    table: string
  ) => Promise<boolean>;
}

export async function createSQLiteDao(
  dbConnectionPromise: Promise<SQLiteDBConnection>
): Promise<SQLiteDao> {
  const dbConnection = await dbConnectionPromise;

  async function getHistory<T>(table: string): Promise<T[]> {
    await dbConnection.open();
    const historyResponse = dbConnection.query(`SELECT * FROM ${table};`);
    await dbConnection.close();
    return (await historyResponse).values as T[];
  }

  async function getTodayHistory<T>(table: string): Promise<T[]> {
    const todayInterval = new TodayInterval();

    await dbConnection.open();
    const todayHistoryResponse = dbConnection.query(
      `SELECT * FROM ${table} WHERE timeStamp >= ? AND timeStamp <= ?;`,
      [todayInterval.start.toISOString(), todayInterval.end.toISOString()]
    );
    await dbConnection.close();
    return (await todayHistoryResponse).values as T[];
  }

  async function getLatest<T>(table: string): Promise<T> {
    await dbConnection.open();
    const latestResponse = dbConnection.query(
      `SELECT * FROM ${table}
       ORDER BY timeStamp DESC LIMIT 1;`
    );
    await dbConnection.close();
    return (await latestResponse).values[0] as T;
  }

  async function getToday<T>(table: string): Promise<T> {
    const todayInterval = new TodayInterval();

    await dbConnection.open();
    const todayLatestResponse = dbConnection.query(
      `SELECT * FROM ${table}
       WHERE timeStamp >= ? AND timeStamp <= ?
       ORDER BY timeStamp DESC LIMIT 1;`,
      [todayInterval.start.toISOString(), todayInterval.end.toISOString()]
    );
    await dbConnection.close();
    return (await todayLatestResponse).values[0] as T;
  }

  async function updateTodayGoal<T extends Goal>(
    goal: T,
    table: string
  ): Promise<boolean> {
    const todayGoal = await getLatest(table);

    if (todayGoal) {
      await dbConnection.open();
      const updateTodayGoalResponse = dbConnection.run(
        `UPDATE ${table}
         SET quantity = ?, timeStamp = ?
         WHERE timeStamp = (SELECT MAX(timeStamp) FROM water_goal_log);`,
        [goal.quantity, goal.timeStamp.toISOString()]
      );
      await dbConnection.close();
      return (await updateTodayGoalResponse).changes.changes == 1;
    }

    await dbConnection.open();
    const addGoalResponse = dbConnection.run(
      "INSERT INTO ${table} (quantity, timeStamp) VALUES (?, ?);",
      [goal.quantity, goal.timeStamp.toISOString()]
    );
    await dbConnection.close();
    return (await addGoalResponse).changes.changes == 1;
  }

  async function getGoalHistory<T extends Goal>(table: string): Promise<T[]> {
    await dbConnection.open();
    const goalHistoryResponse = dbConnection.query(`SELECT * FROM ${table};`);
    await dbConnection.close();
    return (await goalHistoryResponse).values as T[];
  }

  async function getTodayGoalHistory<T extends Goal>(
    table: string
  ): Promise<T[]> {
    const todayInterval = new TodayInterval();

    await dbConnection.open();
    const todayGoalHistoryResponse = dbConnection.query(
      `SELECT * FROM ${table}
       WHERE timeStamp >= ? AND timeStamp <= ?;`,
      [todayInterval.start.toISOString(), todayInterval.end.toISOString()]
    );
    await dbConnection.close();
    return (await todayGoalHistoryResponse).values as T[];
  }

  async function addQuantity<T extends { quantity: number; timeStamp: Date }>(
    quantityObj: T,
    table: string
  ): Promise<boolean> {
    await dbConnection.open();
    const addQuantityResponse = dbConnection.run(
      `INSERT INTO ${table} (quantity, timeStamp) VALUES (?, ?);`,
      [quantityObj.quantity, quantityObj.timeStamp.toISOString()]
    );
    await dbConnection.close();
    return (await addQuantityResponse).changes.changes == 1;
  }

  return {
    getHistory,
    getTodayHistory,
    getLatest,
    getToday,
    updateTodayGoal,
    getGoalHistory,
    getTodayGoalHistory,
    addQuantity,
  };
}
