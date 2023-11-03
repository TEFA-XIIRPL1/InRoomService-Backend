const { roomSeed } = require("./room.seeder");
const { roomCapacitySeed } = require("./roomCapacity.seeder");
const { roomFacilitySeed } = require("./roomFacility.seeder");
const { roomRateSeed } = require("./roomRate.seeder");
const { roomStatusSeed } = require("./roomStatus.seeder");

async function roomBatchSeed() {
  // important to seed in order
  await roomCapacitySeed(); // #1
  await roomStatusSeed(); // #2
  await roomRateSeed(); // #3
  await roomSeed(); // #4
  await roomFacilitySeed(); // #5
}

module.exports = { roomBatchSeed };
