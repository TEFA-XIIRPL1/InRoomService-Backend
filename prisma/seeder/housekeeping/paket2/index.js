const { lostFoundSeed } = require('./lostFound.seeder');

async function paketDuaSeed() {
  await lostFoundSeed(); // #1
}

module.exports = { paketDuaSeed };
