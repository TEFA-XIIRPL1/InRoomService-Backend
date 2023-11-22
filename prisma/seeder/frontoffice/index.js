const { guestSeed } = require("./guest.seeder");
const { roomBatchSeed } = require("./room");
const { ReservationBatchSeed } = require("./reservation");
const { roomChangeSeed } = require("./roomChange.seeder");
const { specialTreatmentSeed } = require("./specialTreatment.seeder");

async function frontOfficeBatchSeed() {
  await guestSeed();
  await roomBatchSeed();
  await ReservationBatchSeed();
  await roomChangeSeed();
  await specialTreatmentSeed();
}

module.exports = { frontOfficeBatchSeed };
