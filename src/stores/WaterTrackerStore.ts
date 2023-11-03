import { WaterGoal } from "$types/fitnessTypes";
import type { WaterRepository } from "../data/repositories/WaterRepository";
import appContainer from "../di/AppContainer";
import { writable, type Writable } from "svelte/store";

export class WaterTrackerStore {
  private _waterRepository: WaterRepository;
  private _currentWaterGoal: Writable<WaterGoal> = writable(
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
      const currentWaterGoal =
        await this._waterRepository.getCurrentWaterGoal();
      this._currentWaterGoal.set(currentWaterGoal);

      const todayTotalWaterIntake =
        await this._waterRepository.getTodayTotalWaterIntake();
      this._todayTotalWaterIntake.set(todayTotalWaterIntake);
    } catch (msg) {
      console.log(msg);
    }
  }

  get currentWaterGoal() {
    return this._currentWaterGoal;
  }

  get todayTotalWaterIntake() {
    return this._todayTotalWaterIntake;
  }

  async addWaterIntake(quantity: number) {
    await this._waterRepository.addWaterIntake(quantity);
  }

  async addWaterGoal(quantity: number) {
    await this._waterRepository.addWaterGoal(quantity);
  }
}

const waterTrackerStore = new WaterTrackerStore(appContainer.waterRepository);
export default waterTrackerStore;
