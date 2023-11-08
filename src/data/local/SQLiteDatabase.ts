import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";

export type SQLiteDatabase = {
  build: () => Promise<SQLiteDBConnection>;
};

export function createSQLiteDatabase(): SQLiteDatabase {
  const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  let dbConnection: SQLiteDBConnection;

  async function build(): Promise<SQLiteDBConnection> {
    const ret = await sqlite.checkConnectionsConsistency();
    const isConn = (await sqlite.isConnection("fitness-tracker-db", false))
      .result;

    if (ret.result && isConn) {
      dbConnection = await sqlite.retrieveConnection(
        "fitness-tracker-db",
        false
      );
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
      CREATE TABLE IF NOT EXISTS water_intake (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quantity INTEGER NOT NULL,
      timeStamp INTEGER NOT NULL);

      CREATE TABLE IF NOT EXISTS water_goal (
        id INTERGER PRIMARY KEY AUTOINCREMENT,
        quantity INTEGER NOT NULL,
        timeStamp INTEGER NOT NULL);
      );

      CREATE TABLE IF NOT EXISTS exercise_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        exerciseType TEXT NOT NULL,
        timeStamp INTEGER NOT NULL
      );
    `;

    await dbConnection.execute(initialSchema);
    await dbConnection.close();
    await sqlite.closeConnection("fitness-tracker-db", false);

    return dbConnection;
  }

  return {
    build,
  };
}
