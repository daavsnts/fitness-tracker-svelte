import type { ExerciseRepository } from "src/data/repositories/ExerciseRepository";
import appContainer from "../di/AppContainer";
import { writable, type Writable } from "svelte/store";
import { ExerciseGoal, type Exercise } from "$types/fitnessTypes";

export class ExerciseTrackerStore {
  private _exerciseRepository: ExerciseRepository;
  private _todayExerciseHistory: Writable<Exercise[]> = writable(
    [] as Exercise[]
  );
  private _todayTotalExercisePauses: Writable<number> = writable(0);
  private _todayCurrentExerciseGoal: Writable<ExerciseGoal> = writable(
    new ExerciseGoal(0, new Date())
  );
  private _totalExercisePauses: Writable<number> = writable(0);

  constructor(exerciseRepository: ExerciseRepository) {
    this._exerciseRepository = exerciseRepository;
  }

  async refreshStoreStates() {
    try {
      const todayExerciseHistory =
        await this._exerciseRepository.getTodayExerciseHistory();
      if (todayExerciseHistory)
        this._todayExerciseHistory.set(todayExerciseHistory);

      const todayTotalExercisePauses =
        await this._exerciseRepository.getTodayTotalExercisesPauses();
      if (todayTotalExercisePauses)
        this._todayTotalExercisePauses.set(todayTotalExercisePauses);

      const todayCurrentExerciseGoal =
        await this._exerciseRepository.getTodayCurrentExerciseGoal();
      if (todayCurrentExerciseGoal)
        this._todayCurrentExerciseGoal.set(todayCurrentExerciseGoal);

      const totalExercisePauses =
        await this._exerciseRepository.getTotalExercisesPauses();
      if (totalExercisePauses)
        this._totalExercisePauses.set(totalExercisePauses);
    } catch (msg) {
      console.log(msg);
    }
  }

  get todayExerciseHistory() {
    return this._todayExerciseHistory;
  }

  get todayTotalExercisePauses() {
    return this._todayTotalExercisePauses;
  }

  get todayCurrentExerciseGoal() {
    return this._todayCurrentExerciseGoal;
  }

  get totalExercisePauses() {
    return this._totalExercisePauses;
  }

  async addExercise(type: string) {
    await this._exerciseRepository.addExercise(type);
    await this.refreshStoreStates();
  }

  async updateTodayExerciseGoal(quantity: number) {
    await this._exerciseRepository.updateTodayExerciseGoal(quantity);
    await this.refreshStoreStates();
  }

  setTodayTotalExercisePauses(quantity: number) {
    this._todayTotalExercisePauses.set(quantity);
  }

  setTotalExercisePauses(quantity: number) {
    this._totalExercisePauses.set(quantity);
  }
}

const exerciseTrackerStore = new ExerciseTrackerStore(
  appContainer.exerciseRepository
);
export default exerciseTrackerStore;
