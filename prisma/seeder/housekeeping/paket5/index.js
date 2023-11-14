const { guestPreferenceSeed } = require("./guestPreference.seeder");
const { roomChangeSeed } = require("./roomChange.seeder");
const { departementSeed } = require("./departement.seeder");
const { taskSeed } = require("./task.seeder");
// const { forecast } = require("./forecast.seeder");

async function paketLimaSeed() {
  await guestPreferenceSeed(); // #1
  await roomChangeSeed(); // #2
  await departementSeed(); // #3
  await taskSeed(); // #4
//  await forecast(); // #5
}

module.exports = { paketLimaSeed };
