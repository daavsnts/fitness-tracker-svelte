import type { WaterGoal, WaterIntake } from "$types/fitnessTypes";
import type { FirestoreWaterDao } from "../network/FirestoreWaterDao";
import type { UserRepository } from "./UserRepository";

export class WaterRepository {
  private _dao: FirestoreWaterDao;
  private _userRepository: UserRepository;

  constructor(dao: FirestoreWaterDao, userRepository: UserRepository) {
    this._dao = dao;
    this._userRepository = userRepository;
  }

  async getWaterIntakeHistory(): Promise<WaterIntake[]> {
    const userId = this._userRepository.getUser().uid;
    return await this._dao.getWaterIntakeHistory(userId);
  }

  async getTotalWaterIntake(): Promise<number> {
    const userId = this._userRepository.getUser().uid;
    return await this._dao.getTotalWaterIntake(userId);
  }

  async getTodayTotalWaterIntake(): Promise<number> {
    const userId = this._userRepository.getUser().uid;
    return await this._dao.getTodayTotalWaterIntake(userId);
  }

  async getTodayWaterIntakeHistory(): Promise<WaterIntake[]> {
    const userId = this._userRepository.getUser().uid;
    return await this._dao.getTodayWaterIntakeHistory(userId);
  }

  async getWaterGoalHistory(): Promise<WaterGoal[]> {
    const userId = this._userRepository.getUser().uid;
    return await this._dao.getWaterGoalHistory(userId);
  }

  async getTodayCurrentWaterGoal(): Promise<WaterGoal> {
    const userId = this._userRepository.getUser().uid;
    return await this._dao.getTodayCurrentWaterGoal(userId);
  }

  async updateTodayWaterGoal(quantity: number): Promise<void> {
    const userId = this._userRepository.getUser().uid;
    return await this._dao.updateTodayWaterGoal(userId, quantity);
  }

  async addWaterIntake(quantity: number): Promise<void> {
    const userId = this._userRepository.getUser().uid;
    return await this._dao.addWaterIntake(userId, quantity);
  }
}
