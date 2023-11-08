import type { WaterGoal } from "$types/fitnessTypes";
import type { WaterRepository } from "../data/repository/WaterRepository";
import appContainer from "../di/AppContainer";
import { writable, type Writable } from "svelte/store";

export type WaterTrackerStore = {
  getTotalWaterIntake: () => Writable<number>;
  addWaterIntake: (quantity: number) => Promise<boolean>;
  getLatestWaterGoal: () => Writable<WaterGoal>;
  refreshStoreStates: () => Promise<void>;
};

function createWaterTrackerStore(
  waterRepository: WaterRepository
): WaterTrackerStore {
  const totalWaterIntake: Writable<number> = writable(0);
  const latestWaterGoal: Writable<WaterGoal> = writable(null as WaterGoal);

  async function refreshStoreStates() {
    try {
      const awaitedTotalWaterIntake =
        await waterRepository.getTotalWaterIntake();
      if (awaitedTotalWaterIntake)
        totalWaterIntake.set(awaitedTotalWaterIntake);

      const awaitedLatestWaterGoal = await waterRepository.getLatestWaterGoal();
      if (awaitedLatestWaterGoal) latestWaterGoal.set(awaitedLatestWaterGoal);
    } catch (msg) {
      console.log(msg);
    }
  }

  function getTotalWaterIntake(): Writable<number> {
    return totalWaterIntake;
  }

  async function addWaterIntake(quantity: number): Promise<boolean> {
    return await waterRepository.addWaterIntake(quantity);
  }

  function getLatestWaterGoal(): Writable<WaterGoal> {
    return latestWaterGoal;
  }

  return {
    getTotalWaterIntake,
    addWaterIntake,
    getLatestWaterGoal,
    refreshStoreStates,
  };
}

const waterTrackerStore = createWaterTrackerStore(
  appContainer.getWaterRepository()
);
export default waterTrackerStore;
