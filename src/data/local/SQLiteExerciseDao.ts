import type { Exercise, ExerciseGoal } from "$types/fitnessTypes";
import type { SQLiteDBConnection } from "@capacitor-community/sqlite";
import type { SQLiteDao } from "./SQLiteDao";

export interface SQLiteExerciseDao {
  getExerciseHistory: () => Promise<Exercise[]>;
  getTodayExerciseHistory: () => Promise<Exercise[]>;
  getLatestExerciseGoal: () => Promise<ExerciseGoal>;
  getTodayExerciseGoal: () => Promise<ExerciseGoal>;
  getExerciseGoalHistory: () => Promise<ExerciseGoal[]>;
  getTodayExerciseGoalHistory: () => Promise<ExerciseGoal[]>;
  addExercise: (exercise: Exercise) => Promise<boolean>;
  updateTodayExerciseGoal: (exerciseGoal: ExerciseGoal) => Promise<boolean>;
}

export async function createSQLiteExerciseDao(
  daoPromise: Promise<SQLiteDao>,
  dbConnectionPromise: Promise<SQLiteDBConnection>
): Promise<SQLiteExerciseDao> {
  const dbConnection = await dbConnectionPromise;
  const dao = await daoPromise;
  const EXERCISE_TABLE = "exercise_log";
  const EXERCISE_GOAL_TABLE = "exercise_goal_log";

  async function getExerciseHistory(): Promise<Exercise[]> {
    return await dao.getHistory(EXERCISE_TABLE);
  }

  async function getTodayExerciseHistory(): Promise<Exercise[]> {
    return await dao.getTodayHistory(EXERCISE_TABLE);
  }

  async function getLatestExerciseGoal(): Promise<ExerciseGoal> {
    return await dao.getLatest(EXERCISE_GOAL_TABLE);
  }

  async function getTodayExerciseGoal(): Promise<ExerciseGoal> {
    return await dao.getToday(EXERCISE_GOAL_TABLE);
  }

  async function getExerciseGoalHistory(): Promise<ExerciseGoal[]> {
    return await dao.getHistory(EXERCISE_GOAL_TABLE);
  }

  async function getTodayExerciseGoalHistory(): Promise<ExerciseGoal[]> {
    return await dao.getTodayHistory(EXERCISE_GOAL_TABLE);
  }

  async function addExercise(exercise: Exercise): Promise<boolean> {
    await dbConnection.open();
    const addQuantityResponse = dbConnection.run(
      `INSERT INTO ${EXERCISE_TABLE} (type, timeStamp) VALUES (?, ?);`,
      [exercise.type, exercise.timeStamp.toISOString()]
    );
    await dbConnection.close();
    return (await addQuantityResponse).changes.changes == 1;
  }

  async function updateTodayExerciseGoal(
    waterGoal: ExerciseGoal
  ): Promise<boolean> {
    return await dao.updateTodayGoal(waterGoal, EXERCISE_GOAL_TABLE);
  }

  return {
    getExerciseHistory,
    getTodayExerciseHistory,
    getLatestExerciseGoal,
    getTodayExerciseGoal,
    getExerciseGoalHistory,
    getTodayExerciseGoalHistory,
    addExercise,
    updateTodayExerciseGoal,
  };
}
