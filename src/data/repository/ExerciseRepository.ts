import type { ExercisePause, ExercisePausesGoal } from "$types/fitnessTypes";
import type { SQLiteExerciseDao } from "../local/SQLiteExerciseDao";

export interface ExerciseRepository {
  getTotalExercisePauses: () => Promise<number>;
  getTodayTotalExercisePauses: () => Promise<number>;
  getExerciseHistory: () => Promise<ExercisePause[]>;
  getTodayExerciseHistory: () => Promise<ExercisePause[]>;
  getLatestExercisePausesGoal: () => Promise<ExercisePausesGoal>;
  getTodayExercisePausesGoal: () => Promise<ExercisePausesGoal>;
  addExercisePause: (type: string) => Promise<boolean>;
  updateTodayExercisePausesGoal: (quantity: number) => Promise<boolean>;
}

export async function createExerciseRepository(
  exerciseDaoPromise: Promise<SQLiteExerciseDao>
): Promise<ExerciseRepository> {
  const dao = await exerciseDaoPromise;

  async function getTotalExercisePauses(): Promise<number> {
    const exerciseHistory = await dao.getExercisePausesHistory();
    return exerciseHistory.length;
  }

  async function getTodayTotalExercisePauses(): Promise<number> {
    const todayExerciseHistory = await dao.getTodayExercisePausesHistory();
    return todayExerciseHistory.length;
  }

  async function getExerciseHistory(): Promise<ExercisePause[]> {
    return await dao.getExercisePausesHistory();
  }

  async function getTodayExerciseHistory(): Promise<ExercisePause[]> {
    return await dao.getTodayExercisePausesHistory();
  }

  async function getLatestExercisePausesGoal(): Promise<ExercisePausesGoal> {
    return await dao.getLatestExercisePausesGoal();
  }

  async function getTodayExercisePausesGoal(): Promise<ExercisePausesGoal> {
    return await dao.getTodayExercisePausesGoal();
  }

  async function addExercisePause(type: string): Promise<boolean> {
    return await dao.addExercisePause({
      type: type,
      timeStamp: new Date(),
    } as ExercisePause);
  }

  async function updateTodayExercisePausesGoal(
    quantity: number
  ): Promise<boolean> {
    return await dao.updateTodayExercisePausesGoal({
      quantity: quantity,
      timeStamp: new Date(),
    } as ExercisePausesGoal);
  }

  return {
    getTotalExercisePauses,
    getTodayTotalExercisePauses,
    getExerciseHistory,
    getTodayExerciseHistory,
    getLatestExercisePausesGoal,
    getTodayExercisePausesGoal,
    addExercisePause,
    updateTodayExercisePausesGoal,
  };
}
