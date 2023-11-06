import type { Exercise, ExerciseGoal } from "$types/fitnessTypes";
import type { FirestoreExerciseDao } from "../network/FirestoreExerciseDao";
import type { UserRepository } from "./UserRepository";

export class ExerciseRepository {
  private _dao: FirestoreExerciseDao;
  private _userRepository: UserRepository;

  constructor(dao: FirestoreExerciseDao, userRepository: UserRepository) {
    this._dao = dao;
    this._userRepository = userRepository;
  }

  async getExerciseHistory(): Promise<Exercise[]> {
    const userId = this._userRepository.getUser().uid;
    return await this._dao.getExerciseHistory(userId);
  }

  async getTodayTotalExercisesPauses(): Promise<number> {
    const userId = this._userRepository.getUser().uid;
    return await this._dao.getTodayTotalExercisesPauses(userId);
  }

  async getTodayExerciseHistory(): Promise<Exercise[]> {
    const userId = this._userRepository.getUser().uid;
    return await this._dao.getTodayExerciseHistory(userId);
  }

  async getExerciseGoalHistory(): Promise<ExerciseGoal[]> {
    const userId = this._userRepository.getUser().uid;
    return await this._dao.getExerciseGoalHistory(userId);
  }

  async getTodayCurrentExerciseGoal(): Promise<ExerciseGoal> {
    const userId = this._userRepository.getUser().uid;
    return await this._dao.getTodayCurrentExerciseGoal(userId);
  }

  async updateTodayExerciseGoal(quantity: number) {
    const userId = this._userRepository.getUser().uid;
    return await this._dao.updateTodayExerciseGoal(userId, quantity);
  }

  async addExercise(type: string): Promise<void> {
    const userId = this._userRepository.getUser().uid;
    return await this._dao.addExercise(userId, type);
  }
}
