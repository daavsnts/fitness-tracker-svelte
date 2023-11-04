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

  constructor(waterRepository: WaterRepository) {
    this._waterRepository = waterRepository;
    this.init();
  }

  init() {
    void this.refreshStoreStates();
  }

  private async refreshStoreStates() {
    try {
      const todayCurrentWaterGoal =
        await this._waterRepository.getTodayCurrentWaterGoal();
      this._todayCurrentWaterGoal.set(todayCurrentWaterGoal);

      const todayTotalWaterIntake =
        await this._waterRepository.getTodayTotalWaterIntake();
      this._todayTotalWaterIntake.set(todayTotalWaterIntake);
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
