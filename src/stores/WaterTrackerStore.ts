import type { WaterGoal } from "$types/fitnessTypes";
import type { WaterRepository } from "../data/repository/WaterRepository";
import { appContainer } from "../di/AppContainer";
import { writable, type Writable } from "svelte/store";

export interface WaterTrackerStore {
  getTodayTotalWaterIntake: () => Writable<number>;
  addWaterIntake: (quantity: number) => Promise<boolean>;
  getTodayWaterGoal: () => Writable<WaterGoal>;
  refreshStoreStates: () => Promise<void>;
  updateTodayWaterGoal(quantity: number): Promise<boolean>;
}

function createWaterTrackerStore(
  waterRepositoryPromise: Promise<WaterRepository>
): WaterTrackerStore {
  const todayTotalWaterIntake: Writable<number> = writable(0);
  const todayWaterGoal: Writable<WaterGoal> = writable({
    quantity: 0,
    timeStamp: new Date(),
  } as WaterGoal);
  let waterRepository: WaterRepository;

  async function refreshStoreStates() {
    try {
      if (!waterRepository) waterRepository = await waterRepositoryPromise;

      const awaitedTodayTotalWaterIntake =
        await waterRepository.getTodayTotalWaterIntake();
      if (awaitedTodayTotalWaterIntake)
        todayTotalWaterIntake.set(awaitedTodayTotalWaterIntake);

      const awaitedTodayWaterGoal = await waterRepository.getTodayWaterGoal();
      if (awaitedTodayWaterGoal) todayWaterGoal.set(awaitedTodayWaterGoal);
    } catch (msg) {
      console.log(`createWaterTrackerStore -> refreshStoreStates -> ${msg}`);
    }
  }

  function getTodayTotalWaterIntake(): Writable<number> {
    return todayTotalWaterIntake;
  }

  async function addWaterIntake(quantity: number): Promise<boolean> {
    const result = await waterRepository.addWaterIntake(quantity);
    await refreshStoreStates();
    return result;
  }

  function getTodayWaterGoal(): Writable<WaterGoal> {
    return todayWaterGoal;
  }

  async function updateTodayWaterGoal(quantity: number): Promise<boolean> {
    const result = await waterRepository.updateTodayWaterGoal(quantity);
    await refreshStoreStates();
    console.log(result);
    return result;
  }

  return {
    getTodayTotalWaterIntake,
    addWaterIntake,
    getTodayWaterGoal,
    refreshStoreStates,
    updateTodayWaterGoal,
  };
}

const waterTrackerStore = createWaterTrackerStore(
  appContainer.getWaterRepository()
);
export default waterTrackerStore;
