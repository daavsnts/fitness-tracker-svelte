import { createSQLiteWaterDao } from "../data/local/SQLiteWaterDao";
import { createSQLiteDaoUtils } from "../data/local/SQLiteDaoUtils";
import { createSQLiteDatabase } from "../data/local/SQLiteDatabase";
import {
  createWaterRepository,
  type WaterRepository,
} from "../data/repository/WaterRepository";
import {
  createExerciseRepository,
  type ExerciseRepository,
} from "../data/repository/ExerciseRepository";
import { createSQLiteExerciseDao } from "../data/local/SQLiteExerciseDao";

export interface AppContainer {
  getWaterRepository: () => Promise<WaterRepository>;
  getExerciseRepository: () => Promise<ExerciseRepository>;
}

function createAppContainer(): AppContainer {
  const dbConnection = createSQLiteDatabase();
  const daoUtils = createSQLiteDaoUtils(dbConnection);
  const waterDao = createSQLiteWaterDao(dbConnection, daoUtils);
  const waterRepository = createWaterRepository(waterDao);
  const exerciseDao = createSQLiteExerciseDao(dbConnection, daoUtils);
  const exerciseRepository = createExerciseRepository(exerciseDao);

  async function getWaterRepository(): Promise<WaterRepository> {
    return await waterRepository;
  }

  async function getExerciseRepository(): Promise<ExerciseRepository> {
    return await exerciseRepository;
  }

  return {
    getWaterRepository,
    getExerciseRepository,
  };
}

const appContainer = createAppContainer();
export { appContainer };
