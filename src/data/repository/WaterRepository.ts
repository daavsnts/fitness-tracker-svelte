import type { WaterConsumption } from "$types/water-types";
import dataBaseMock from "../local/DatabaseMock";

function createWaterRepository() {
  function getDailyWaterQuantity(): number {
    return dataBaseMock.getWaterConsumption().reduce((acc, currentValue) => {
      return acc + currentValue.quantity;
    }, 0);
  }

  function getWaterConsumptionHistory(): Array<WaterConsumption> {
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
