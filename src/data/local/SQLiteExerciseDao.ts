import type { ExercisePause, ExercisePausesGoal } from "$types/fitnessTypes";
import type { SQLiteDBConnection } from "@capacitor-community/sqlite";
import type { SQLiteDaoUtils } from "./SQLiteDaoUtils";

export interface SQLiteExerciseDao {
  getExercisePausesHistory: () => Promise<ExercisePause[]>;
  getTodayExercisePausesHistory: () => Promise<ExercisePause[]>;
  getLatestExercisePausesGoal: () => Promise<ExercisePausesGoal>;
  getTodayExercisePausesGoal: () => Promise<ExercisePausesGoal>;
  getExercisePausesGoalHistory: () => Promise<ExercisePausesGoal[]>;
  getTodayExercisePausesGoalHistory: () => Promise<ExercisePausesGoal[]>;
  addExercisePause: (exercisePause: ExercisePause) => Promise<boolean>;
  updateTodayExercisePausesGoal: (
    exercisePausesGoal: ExercisePausesGoal
  ) => Promise<boolean>;
}

export async function createSQLiteExerciseDao(
  dbConnectionPromise: Promise<SQLiteDBConnection>,
  daoUtilsPromise: Promise<SQLiteDaoUtils>
): Promise<SQLiteExerciseDao> {
  const dbConnection = await dbConnectionPromise;
  const daoUtils = await daoUtilsPromise;
  const EXERCISE_PAUSES_TABLE = "exercise_pauses_log";
  const EXERCISE_PAUSES_GOAL_TABLE = "exercise_pauses_goal_log";

  async function getExercisePausesHistory(): Promise<ExercisePause[]> {
    return await daoUtils.getHistory(EXERCISE_PAUSES_TABLE);
  }

  async function getTodayExercisePausesHistory(): Promise<ExercisePause[]> {
    return await daoUtils.getTodayHistory(EXERCISE_PAUSES_TABLE);
  }

  async function getLatestExercisePausesGoal(): Promise<ExercisePausesGoal> {
    return await daoUtils.getLatest(EXERCISE_PAUSES_GOAL_TABLE);
  }

  async function getTodayExercisePausesGoal(): Promise<ExercisePausesGoal> {
    return await daoUtils.getToday(EXERCISE_PAUSES_GOAL_TABLE);
  }

  async function getExercisePausesGoalHistory(): Promise<ExercisePausesGoal[]> {
    return await daoUtils.getHistory(EXERCISE_PAUSES_GOAL_TABLE);
  }

  async function getTodayExercisePausesGoalHistory(): Promise<
    ExercisePausesGoal[]
  > {
    return await daoUtils.getTodayHistory(EXERCISE_PAUSES_GOAL_TABLE);
  }

  async function addExercisePause(
    exercisePause: ExercisePause
  ): Promise<boolean> {
    await dbConnection.open();
    const addExercisePauseResponse = dbConnection.run(
      `INSERT INTO ${EXERCISE_PAUSES_TABLE} (type, timeStamp) VALUES (?, ?);`,
      [exercisePause.type, exercisePause.timeStamp.toISOString()]
    );
    await dbConnection.close();
    return (await addExercisePauseResponse).changes.changes == 1;
  }

  async function updateTodayExercisePausesGoal(
    exercisePausesGoal: ExercisePausesGoal
  ): Promise<boolean> {
    return await daoUtils.updateTodayGoal(
      exercisePausesGoal,
      EXERCISE_PAUSES_GOAL_TABLE
    );
  }

  return {
    getExercisePausesHistory,
    getTodayExercisePausesHistory,
    getLatestExercisePausesGoal,
    getTodayExercisePausesGoal,
    getExercisePausesGoalHistory,
    getTodayExercisePausesGoalHistory,
    addExercisePause,
    updateTodayExercisePausesGoal,
  };
}
