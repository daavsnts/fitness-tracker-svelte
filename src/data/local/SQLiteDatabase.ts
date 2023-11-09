import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";

export async function createSQLiteDatabase(): Promise<SQLiteDBConnection> {
  const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  let dbConnection: SQLiteDBConnection;

  const ret = await sqlite.checkConnectionsConsistency();
  const isConn = (await sqlite.isConnection("fitness-tracker-db", false))
    .result;

  if (ret.result && isConn) {
    dbConnection = await sqlite.retrieveConnection("fitness-tracker-db", false);
  } else {
    dbConnection = await sqlite.createConnection(
      "fitness-tracker-db",
      false,
      "no-encryption",
      1,
      false
    );
  }

  await dbConnection.open();

  const initialSchema = `
      CREATE TABLE IF NOT EXISTS water_intake_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quantity INTEGER NOT NULL,
        timeStamp INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS water_goal_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quantity INTEGER NOT NULL,
        timeStamp INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS exercise_pauses_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        exerciseType TEXT NOT NULL,
        timeStamp INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS exercise_pauses_goal_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quantity INTEGER NOT NULL,
        timeStamp INTEGER NOT NULL
      );
    `;

  await dbConnection.execute(initialSchema);
  await dbConnection.close();

  return dbConnection;
}
