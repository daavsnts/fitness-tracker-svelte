import { createSQLiteWaterDao } from "../data/local/SQLiteWaterDao";
import { createSQLiteDao } from "../data/local/SQLiteDao";
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
  const dao = createSQLiteDao(dbConnection);
  const waterDao = createSQLiteWaterDao(dao, dbConnection);
  const exerciseDao = createSQLiteExerciseDao(dao, dbConnection);
  const waterRepository = createWaterRepository(waterDao);
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
