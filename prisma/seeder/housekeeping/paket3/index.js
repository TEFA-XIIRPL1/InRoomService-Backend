const { vipSeed } = require("./vip.seeder");
const { purchaseSeed } = require("./purchase.seeder");
const { stockSeed } = require("./stock.seeder");
const { extraBedSeed } = require("./extraBed.seeder");

async function paketTigaSeed() {
  await vipSeed(); // #1
  await purchaseSeed(); // #2
  await stockSeed(); // #3
  await extraBedSeed(); // #4

}

module.exports = { paketTigaSeed};
