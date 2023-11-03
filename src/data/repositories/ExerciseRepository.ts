import type { Exercise, ExerciseGoal } from "$types/fitnessTypes";
import type { FirestoreExerciseDao } from "../network/FirestoreExerciseDao";

export class ExerciseRepository {
  private _dao: FirestoreExerciseDao;

  constructor(dao: FirestoreExerciseDao) {
    this._dao = dao;
  }

  async getExerciseHistory(): Promise<Exercise[]> {
    return await this._dao.getExerciseHistory();
  }

  async getTodayTotalExercisesPauses(): Promise<number> {
    return await this._dao.getTodayTotalExercisesPauses();
  }

  async getTodayExerciseHistory(): Promise<Exercise[]> {
    return await this._dao.getTodayExerciseHistory();
  }

  async getExerciseGoalHistory(): Promise<ExerciseGoal[]> {
    return await this._dao.getExerciseGoalHistory();
  }

  async getCurrentExerciseGoal(): Promise<ExerciseGoal> {
    return await this._dao.getCurrentExerciseGoal();
  }

  async updateTodayExerciseGoal(quantity: number) {
    return await this._dao.updateTodayExerciseGoal(quantity);
  }

  async addExercise(type: string): Promise<void> {
    return await this._dao.addExercise(type);
  }
}
