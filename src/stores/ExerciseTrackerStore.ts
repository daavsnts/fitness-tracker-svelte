import type { ExerciseRepository } from "src/data/repositories/ExerciseRepository";
import appContainer from "../di/AppContainer";
import { writable, type Writable } from "svelte/store";
import type { Exercise } from "$types/fitnessTypes";

export class ExerciseTrackerStore {
  private _exerciseRepository: ExerciseRepository;
  private _todayExerciseHistory: Writable<Exercise[]> = writable(
    [] as Exercise[]
  );

  constructor(exerciseRepository: ExerciseRepository) {
    this._exerciseRepository = exerciseRepository;
    this.init();
  }

  init() {
    void this.refreshStoreStates();
  }

  private async refreshStoreStates() {
    try {
      const todayExerciseHistory =
        await this._exerciseRepository.getTodayExerciseHistory();
      this._todayExerciseHistory.set(todayExerciseHistory);
    } catch (msg) {
      console.log(msg);
    }
  }

  get todayExerciseHistory() {
    return this._todayExerciseHistory;
  }

  async addExercise(type: string) {
    await this._exerciseRepository.addExercise(type);
    await this.refreshStoreStates();
  }
}

const exerciseTrackerStore = new ExerciseTrackerStore(
  appContainer.exerciseRepository
);
export default exerciseTrackerStore;
