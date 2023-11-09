import { createSQLiteWaterDao } from "../data/local/SQLiteWaterDao";
import { createSQLiteDao } from "../data/local/SQLiteDao";
import { createSQLiteDatabase } from "../data/local/SQLiteDatabase";
import {
  createWaterRepository,
  type WaterRepository,
} from "../data/repository/WaterRepository";

export interface AppContainer {
  getWaterRepository: () => Promise<WaterRepository>;
}

function createAppContainer(): AppContainer {
  const dbConnection = createSQLiteDatabase();
  const dao = createSQLiteDao(dbConnection);
  const waterDao = createSQLiteWaterDao(dao);
  const waterRepository = createWaterRepository(waterDao);

  async function getWaterRepository(): Promise<WaterRepository> {
    return await waterRepository;
  }

  return {
    getWaterRepository,
  };
}

const appContainer = createAppContainer();
export { appContainer };
