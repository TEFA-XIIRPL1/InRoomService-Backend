const { guestSeed } = require("./guest.seeder");
const { roomBatchSeed } = require("./room");
const { ReservationBatchSeed } = require("./reservation");
const { roomChangeSeed } = require("./roomChange.seeder");

async function frontOfficeBatchSeed() {
  await guestSeed();
  await roomBatchSeed();
  await ReservationBatchSeed();
  await roomChangeSeed();
}

module.exports = { frontOfficeBatchSeed };
