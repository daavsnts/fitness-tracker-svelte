import type { WaterIntakeGoal } from "$types/fitnessTypes";
import type { WaterRepository } from "../data/repository/WaterRepository";
import { appContainer } from "../di/AppContainer";
import { writable, type Writable } from "svelte/store";

export interface WaterTrackerStore {
  getTodayTotalWaterIntake: () => Writable<number>;
  addWaterIntake: (quantity: number) => Promise<boolean>;
  getTodayWaterIntakeGoal: () => Writable<WaterIntakeGoal>;
  refreshStoreStates: () => Promise<void>;
  updateTodayWaterIntakeGoal(quantity: number): Promise<boolean>;
}

function createWaterTrackerStore(
  waterRepositoryPromise: Promise<WaterRepository>
): WaterTrackerStore {
  const todayTotalWaterIntake: Writable<number> = writable(0);
  const todayWaterIntakeGoal: Writable<WaterIntakeGoal> = writable({
    quantity: 0,
    timeStamp: new Date(),
  } as WaterIntakeGoal);
  let waterRepository: WaterRepository;

  async function refreshStoreStates() {
    try {
      if (!waterRepository) waterRepository = await waterRepositoryPromise;

      const awaitedTodayTotalWaterIntake =
        await waterRepository.getTodayTotalWaterIntake();
      if (awaitedTodayTotalWaterIntake)
        todayTotalWaterIntake.set(awaitedTodayTotalWaterIntake);

      const awaitedTodayWaterIntakeGoal = await waterRepository.getTodayWaterIntakeGoal();
      if (awaitedTodayWaterIntakeGoal) todayWaterIntakeGoal.set(awaitedTodayWaterIntakeGoal);
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

  function getTodayWaterIntakeGoal(): Writable<WaterIntakeGoal> {
    return todayWaterIntakeGoal;
  }

  async function updateTodayWaterIntakeGoal(quantity: number): Promise<boolean> {
    const result = await waterRepository.updateTodayWaterIntakeGoal(quantity);
    await refreshStoreStates();
    console.log(result);
    return result;
  }

  return {
    getTodayTotalWaterIntake,
    addWaterIntake,
    getTodayWaterIntakeGoal,
    refreshStoreStates,
    updateTodayWaterIntakeGoal,
  };
}

const waterTrackerStore = createWaterTrackerStore(
  appContainer.getWaterRepository()
);
export default waterTrackerStore;
