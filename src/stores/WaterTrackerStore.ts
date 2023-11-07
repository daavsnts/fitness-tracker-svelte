import { WaterGoal } from "$types/fitnessTypes";
import type { WaterRepository } from "../data/repositories/WaterRepository";
import appContainer from "../di/AppContainer";
import { writable, type Writable } from "svelte/store";

export class WaterTrackerStore {
  private _waterRepository: WaterRepository;
  private _todayCurrentWaterGoal: Writable<WaterGoal> = writable(
    new WaterGoal(0, new Date())
  );
  private _todayTotalWaterIntake: Writable<number> = writable(0);
  private _todayWaterIntakeHistory: Writable<WaterGoal[]> = writable(
    [] as WaterGoal[]
  );
  private _totalWaterIntake: Writable<number> = writable(0);

  constructor(waterRepository: WaterRepository) {
    this._waterRepository = waterRepository;
  }

  async refreshStoreStates() {
    try {
      const todayCurrentWaterGoal =
        await this._waterRepository.getTodayCurrentWaterGoal();
      if (todayCurrentWaterGoal)
        this._todayCurrentWaterGoal.set(todayCurrentWaterGoal);

      const todayTotalWaterIntake =
        await this._waterRepository.getTodayTotalWaterIntake();
      if (todayTotalWaterIntake)
        this._todayTotalWaterIntake.set(todayTotalWaterIntake);

      const todayWaterIntakeHistory =
        await this._waterRepository.getTodayWaterIntakeHistory();
      if (todayTotalWaterIntake)
        this._todayWaterIntakeHistory.set(todayWaterIntakeHistory);

      const totalWaterIntake =
        await this._waterRepository.getTotalWaterIntake();
      if (totalWaterIntake) this._totalWaterIntake.set(totalWaterIntake);
    } catch (msg) {
      console.log(msg);
    }
  }

  get todayCurrentWaterGoal() {
    return this._todayCurrentWaterGoal;
  }

  get todayTotalWaterIntake() {
    return this._todayTotalWaterIntake;
  }

  get todayWaterIntakeHistory() {
    return this._todayWaterIntakeHistory;
  }

  get totalWaterIntake() {
    return this._totalWaterIntake;
  }

  async addWaterIntake(quantity: number) {
    await this._waterRepository.addWaterIntake(quantity);
    await this.refreshStoreStates();
  }

  async updateTodayWaterGoal(quantity: number) {
    await this._waterRepository.updateTodayWaterGoal(quantity);
    await this.refreshStoreStates();
  }
}

const waterTrackerStore = new WaterTrackerStore(appContainer.waterRepository);
export default waterTrackerStore;
