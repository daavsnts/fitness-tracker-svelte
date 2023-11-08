import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";

export type SQLiteDatabase = {
  build: () => Promise<void>;
  get: () => SQLiteDBConnection;
};

export function createSQliteDatabase(): SQLiteDatabase {
  const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  let db: SQLiteDBConnection;

  async function build() {
    const ret = await sqlite.checkConnectionsConsistency();
    const isConn = (await sqlite.isConnection("fitness-tracker-db", false))
      .result;

    if (ret.result && isConn) {
      db = await sqlite.retrieveConnection("fitness-tracker-db", false);
    } else {
      db = await sqlite.createConnection(
        "fitness-tracker-db",
        false,
        "no-encryption",
        1,
        false
      );
    }

    await db.open();

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

    await db.execute(initialSchema);
    await db.close();
    await sqlite.closeConnection("fitness-tracker-db", false);
  }

  function get() {
    return db;
  }

  return {
    build,
    get,
  };
}
