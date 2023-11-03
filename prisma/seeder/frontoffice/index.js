const { guestSeed } = require("./guest.seeder");
const { roomBatchSeed } = require("./room");

async function frontOfficeBatchSeed() {
  await guestSeed();
  await roomBatchSeed();
}

module.exports = { frontOfficeBatchSeed };
