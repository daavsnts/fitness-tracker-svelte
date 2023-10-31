import { readable, writable, type Readable, type Writable } from "svelte/store";
import waterRepository from "../data/repository/WaterRepository";

function createWaterTrackerStore(
  initialWaterQuantity: number,
  initialWaterGoal: number
) {
  const waterQuantity = writable(initialWaterQuantity);
  const waterGoal = readable(initialWaterGoal);

  function getWaterQuantity(): Writable<number> {
    return waterQuantity;
  }

  function addWaterQuantity(moreWater: number) {
    waterQuantity.update((waterQuantity) => waterQuantity + moreWater);
  }

  function getWaterGoal(): Readable<number> {
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
