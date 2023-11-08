const { guestSeed } = require("./guest.seeder");
const { roomBatchSeed } = require("./room");
const { ReservationBatchSeed } = require("./reservation")

async function frontOfficeBatchSeed() {
  await guestSeed();
  await roomBatchSeed();
  await ReservationBatchSeed();
}

module.exports = { frontOfficeBatchSeed };
