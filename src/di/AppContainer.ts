import type { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { createSQLiteDao, type SQLiteDao } from "../data/local/SQLiteDao";
import {
  createSQLiteDatabase,
  type SQLiteDatabase,
} from "../data/local/SQLiteDatabase";
import {
  createWaterRepository,
  type WaterRepository,
} from "../data/repository/WaterRepository";

export type AppContainer = {
  getWaterRepository: () => WaterRepository;
};

function createAppContainer() {
  const db = createSQLiteDatabase();
  let dbConnection: SQLiteDBConnection;
  db.build()
    .then((response) => {
      dbConnection = response;
    })
    .catch((reason) => {
      console.log(reason);
    });
  const dao = createSQLiteDao(dbConnection);
  const waterRepository = createWaterRepository(dao);

  function getWaterRepository(): WaterRepository {
    return waterRepository;
  }

  return {
    getWaterRepository,
  };
}

const appContainer = createAppContainer();
export default appContainer;
