import type { WaterGoal } from "$types/fitnessTypes";
import type { WaterRepository } from "../data/repository/WaterRepository";
import { appContainer } from "../di/AppContainer";
import { writable, type Writable } from "svelte/store";

export interface WaterTrackerStore {
  getTotalWaterIntake: () => Writable<number>;
  getTodayTotalWaterIntake: () => Writable<number>;
  addWaterIntake: (quantity: number) => Promise<boolean>;
  getLatestWaterGoal: () => Writable<WaterGoal>;
  getTodayLatestWaterGoal: () => Writable<WaterGoal>;
  refreshStoreStates: () => Promise<void>;
  updateWaterGoal(quantity: number): Promise<boolean>;
  updateTodayWaterGoal(quantity: number): Promise<boolean>;
}

function createWaterTrackerStore(
  waterRepositoryPromise: Promise<WaterRepository>
): WaterTrackerStore {
  const totalWaterIntake: Writable<number> = writable(0);
  const todayTotalWaterIntake: Writable<number> = writable(0);
  const latestWaterGoal: Writable<WaterGoal> = writable({
    quantity: 0,
    timeStamp: new Date(),
  } as WaterGoal);
  const todayLatestWaterGoal: Writable<WaterGoal> = writable({
    quantity: 0,
    timeStamp: new Date(),
  } as WaterGoal);
  let waterRepository: WaterRepository;

  async function refreshStoreStates() {
    try {
      if (!waterRepository) waterRepository = await waterRepositoryPromise;

      const awaitedTotalWaterIntake =
        await waterRepository.getTotalWaterIntake();
      if (awaitedTotalWaterIntake)
        totalWaterIntake.set(awaitedTotalWaterIntake);

      const awaitedTodayTotalWaterIntake =
        await waterRepository.getTodayTotalWaterIntake();
      if (awaitedTodayTotalWaterIntake)
        todayTotalWaterIntake.set(awaitedTodayTotalWaterIntake);

      const awaitedLatestWaterGoal = await waterRepository.getLatestWaterGoal();
      if (awaitedLatestWaterGoal) latestWaterGoal.set(awaitedLatestWaterGoal);

      const awaitedTodayLatestWaterGoal =
        await waterRepository.getTodayLatestWaterGoal();
      if (awaitedTodayLatestWaterGoal)
        todayLatestWaterGoal.set(awaitedTodayLatestWaterGoal);
    } catch (msg) {
      console.log(`createWaterTrackerStore -> refreshStoreStates -> ${msg}`);
    }
  }

  function getTotalWaterIntake(): Writable<number> {
    return totalWaterIntake;
  }

  function getTodayTotalWaterIntake(): Writable<number> {
    return todayTotalWaterIntake;
  }

  async function addWaterIntake(quantity: number): Promise<boolean> {
    const result = await waterRepository.addWaterIntake(quantity);
    await refreshStoreStates();
    return result;
  }

  function getLatestWaterGoal(): Writable<WaterGoal> {
    return latestWaterGoal;
  }

  function getTodayLatestWaterGoal(): Writable<WaterGoal> {
    return todayLatestWaterGoal;
  }

  async function updateWaterGoal(quantity: number): Promise<boolean> {
    const result = await waterRepository.updateWaterGoal(quantity);
    await refreshStoreStates();
    console.log(result);
    return result;
  }

  async function updateTodayWaterGoal(quantity: number): Promise<boolean> {
    const result = await waterRepository.updateTodayWaterGoal(quantity);
    await refreshStoreStates();
    console.log(result);
    return result;
  }

  return {
    getTotalWaterIntake,
    getTodayTotalWaterIntake,
    addWaterIntake,
    getLatestWaterGoal,
    getTodayLatestWaterGoal,
    refreshStoreStates,
    updateWaterGoal,
    updateTodayWaterGoal,
  };
}

const waterTrackerStore = createWaterTrackerStore(
  appContainer.getWaterRepository()
);
export default waterTrackerStore;
