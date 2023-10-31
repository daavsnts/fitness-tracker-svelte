import type { WaterConsumption } from "$types/water-types";

function createDatabaseMock() {
  const waterConsumptionTable: Array<WaterConsumption> = [
    { quantity: 1000, timeStamp: new Date().getTime() },
    { quantity: 2000, timeStamp: new Date().getTime() },
    { quantity: 3000, timeStamp: new Date().getTime() },
  ];
  let waterGoal = 2500;

  function getWaterConsumption() {
    return waterConsumptionTable;
  }

  function addWaterConsumption(waterConsumption: WaterConsumption) {
    waterConsumptionTable.push(waterConsumption);
  }

  function getWaterGoal() {
    return waterGoal;
  }

  function setWaterGoal(newWaterGoal: number) {
    waterGoal = newWaterGoal;
  }

  return {
    getWaterConsumption,
    addWaterConsumption,
    getWaterGoal,
    setWaterGoal,
  };
}

const dataBaseMock = createDatabaseMock();
export default dataBaseMock;
