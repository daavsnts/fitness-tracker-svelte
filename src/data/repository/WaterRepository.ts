import type { WaterConsumption } from "$types/water-types";
import dataBaseMock from "../local/DatabaseMock";

export type WaterRepository = {
  getDailyWaterQuantity: () => number;
  getWaterGoal: () => number;
  getWaterConsumptionHistory: () => WaterConsumption[];
  updateWaterConstumptionHistory: (waterConsumption: WaterConsumption) => void;
};

function createWaterRepository(): WaterRepository {
  function getDailyWaterQuantity(): number {
    return dataBaseMock.getWaterConsumption().reduce((acc, currentValue) => {
      return acc + currentValue.quantity;
    }, 0);
  }

  function getWaterConsumptionHistory(): WaterConsumption[] {
    return dataBaseMock.getWaterConsumption();
  }

  function getWaterGoal(): number {
    return dataBaseMock.getWaterGoal();
  }

  function updateWaterConstumptionHistory(waterConsumption: WaterConsumption) {
    dataBaseMock.addWaterConsumption(waterConsumption);
  }

  return {
    getDailyWaterQuantity,
    getWaterGoal,
    getWaterConsumptionHistory,
    updateWaterConstumptionHistory,
  };
}

const waterRepository = createWaterRepository();
export default waterRepository;
