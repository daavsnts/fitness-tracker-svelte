import type { WaterGoal } from "$types/fitnessTypes";
import type { WaterRepository } from "../data/repository/WaterRepository";
import { appContainer } from "../di/AppContainer";
import { writable, type Writable } from "svelte/store";

export interface WaterTrackerStore {
  getTotalWaterIntake: () => Writable<number>;
  addWaterIntake: (quantity: number) => Promise<boolean>;
  getLatestWaterGoal: () => Writable<WaterGoal>;
  refreshStoreStates: () => Promise<void>;
}

function createWaterTrackerStore(
  waterRepositoryPromise: Promise<WaterRepository>
): WaterTrackerStore {
  const totalWaterIntake: Writable<number> = writable(0);
  const latestWaterGoal: Writable<WaterGoal> = writable(null as WaterGoal);
  let waterRepository: WaterRepository;

  async function refreshStoreStates() {
    try {
      waterRepository = await waterRepositoryPromise;
      const awaitedTotalWaterIntake =
        await waterRepository.getTotalWaterIntake();
      if (awaitedTotalWaterIntake)
        totalWaterIntake.set(awaitedTotalWaterIntake);

      const awaitedLatestWaterGoal = await waterRepository.getLatestWaterGoal();
      if (awaitedLatestWaterGoal) latestWaterGoal.set(awaitedLatestWaterGoal);
    } catch (msg) {
      console.log(`createWaterTrackerStore -> refreshStoreStates -> ${msg}`);
    }
  }

  function getTotalWaterIntake(): Writable<number> {
    return totalWaterIntake;
  }

  async function addWaterIntake(quantity: number): Promise<boolean> {
    const result = await waterRepository.addWaterIntake(quantity);
    await refreshStoreStates();
    return result;
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
