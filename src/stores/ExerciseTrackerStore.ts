import type { ExercisePausesGoal } from "$types/fitnessTypes";
import type { ExerciseRepository } from "../data/repository/ExerciseRepository";
import { appContainer } from "../di/AppContainer";
import { writable, type Writable } from "svelte/store";

export interface ExerciseTrackerStore {
  getTotalExercisePauses: () => Writable<number>;
  getTodayTotalExercisePauses: () => Writable<number>;
  addExercisePause: (type: string) => Promise<boolean>;
  getTodayExercisePausesGoal: () => Writable<ExercisePausesGoal>;
  refreshStoreStates: () => Promise<void>;
  updateTodayExercisePausesGoal(quantity: number): Promise<boolean>;
}

function createExerciseTrackerStore(
  exerciseRepositoryPromise: Promise<ExerciseRepository>
): ExerciseTrackerStore {
  const totalExercisePauses: Writable<number> = writable(0);
  const todayTotalExercisePauses: Writable<number> = writable(0);
  const todayExercisePausesGoal: Writable<ExercisePausesGoal> = writable({
    quantity: 0,
    timeStamp: new Date(),
  } as ExercisePausesGoal);
  let exerciseRepository: ExerciseRepository;

  async function refreshStoreStates() {
    try {
      if (!exerciseRepository)
        exerciseRepository = await exerciseRepositoryPromise;

      const awaitedTotalExercisePauses =
        await exerciseRepository.getTotalExercisePauses();
      if (awaitedTotalExercisePauses)
        totalExercisePauses.set(awaitedTotalExercisePauses);

      const awaitedTodayTotalExercisePauses =
        await exerciseRepository.getTodayTotalExercisePauses();
      if (awaitedTodayTotalExercisePauses)
        todayTotalExercisePauses.set(awaitedTodayTotalExercisePauses);

      const awaitedTodayExercisePausesGoal =
        await exerciseRepository.getTodayExercisePausesGoal();
      if (awaitedTodayExercisePausesGoal)
        todayExercisePausesGoal.set(awaitedTodayExercisePausesGoal);
    } catch (msg) {
      console.log(`createExerciseTrackerStore -> refreshStoreStates -> ${msg}`);
    }
  }

  function getTotalExercisePauses(): Writable<number> {
    return totalExercisePauses;
  }

  function getTodayTotalExercisePauses(): Writable<number> {
    return todayTotalExercisePauses;
  }

  async function addExercisePause(type: string): Promise<boolean> {
    const result = await exerciseRepository.addExercisePause(type);
    await refreshStoreStates();
    return result;
  }

  function getTodayExercisePausesGoal(): Writable<ExercisePausesGoal> {
    return todayExercisePausesGoal;
  }

  async function updateTodayExercisePausesGoal(
    quantity: number
  ): Promise<boolean> {
    const result = await exerciseRepository.updateTodayExercisePausesGoal(
      quantity
    );
    await refreshStoreStates();
    console.log(result);
    return result;
  }

  return {
    getTotalExercisePauses,
    getTodayTotalExercisePauses,
    addExercisePause,
    getTodayExercisePausesGoal,
    refreshStoreStates,
    updateTodayExercisePausesGoal,
  };
}

const waterTrackerStore = createExerciseTrackerStore(
  appContainer.getExerciseRepository()
);
export default waterTrackerStore;
