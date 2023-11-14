const { lostFoundSeed } = require("./lostFound.seeder.js");

async function paketDuaSeed() {
  await lostFoundSeed(); // #1
}

module.exports = { paketDuaSeed };
