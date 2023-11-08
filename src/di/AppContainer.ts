import { createSQLiteDao } from "../data/local/SQLiteDao";
import { createSQLiteDatabase } from "../data/local/SQLiteDatabase";
import {
  createWaterRepository,
  type WaterRepository,
} from "../data/repository/WaterRepository";

export type AppContainer = {
  getWaterRepository: () => WaterRepository;
};

async function createAppContainer() {
  const db = createSQLiteDatabase();
  const dbConnection = await db.build();
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
