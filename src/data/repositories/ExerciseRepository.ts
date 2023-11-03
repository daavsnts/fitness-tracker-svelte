import type { Exercise } from "$types/fitnessTypes";
import type { FirestoreDao } from "../network/FirestoreDao";

export class ExerciseRepository {
  private _dao: FirestoreDao;

  constructor(dao: FirestoreDao) {
    this._dao = dao;
  }

  async getExerciseHistory(): Promise<Exercise[]> {
    return await this._dao.getExerciseHistory();
  }

  async getTodayExerciseHistory(): Promise<Exercise[]> {
    return await this._dao.getTodayExerciseHistory();
  }

  async addExercise(type: string): Promise<void> {
    return await this._dao.addExercise(type);
  }
}
