import { writable, type Writable } from "svelte/store";
import waterRepository from "../data/repository/WaterRepository";

export type WaterTrackerStore = {
  getWaterQuantity: () => Writable<number>;
  addWaterQuantity: (moreWater: number) => void;
  getWaterGoal: () => Writable<number>;
};

function createWaterTrackerStore(
  initialWaterQuantity: number,
  initialWaterGoal: number
): WaterTrackerStore {
  const waterQuantity = writable(initialWaterQuantity);
  const waterGoal = writable(initialWaterGoal);

  function getWaterQuantity(): Writable<number> {
    return waterQuantity;
  }

  function addWaterQuantity(moreWater: number) {
    waterQuantity.update((waterQuantity) => waterQuantity + moreWater);
  }

  function getWaterGoal(): Writable<number> {
    return waterGoal;
  }

  return {
    getWaterQuantity,
    addWaterQuantity,
    getWaterGoal,
  };
}

const waterTrackerStore = createWaterTrackerStore(
  waterRepository.getDailyWaterQuantity(),
  waterRepository.getWaterGoal()
);
export default waterTrackerStore;
