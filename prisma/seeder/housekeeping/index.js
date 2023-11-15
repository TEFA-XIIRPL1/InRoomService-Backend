const { paketSatuSeed } = require('./paket1');
const { paketDuaSeed } = require('./paket2');
const { paketTigaSeed } = require('./paket3');
const { paketEmpatSeed } = require('./paket4');
const { paketLimaSeed } = require('./paket5');

async function houseKeepingSeed() {
  await paketSatuSeed();
  await paketDuaSeed();
  await paketTigaSeed();
  await paketEmpatSeed();
  await paketLimaSeed();
}

module.exports = { houseKeepingSeed };
