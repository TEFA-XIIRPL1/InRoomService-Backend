const { roomSeed } = require("./room.seeder");
const { roomCapacitySeed } = require("./roomCapacity.seeder");
const { roomFacilitySeed } = require("./roomFacility.seeder");
const { roomStatusSeed } = require("./roomStatus.seeder");

async function roomBatchSeed() {
  // important to seed in order
  await roomCapacitySeed(); // #1
  await roomStatusSeed(); // #2
  await roomSeed(); // #4
  await roomFacilitySeed(); // #5
}

module.exports = { roomBatchSeed };
