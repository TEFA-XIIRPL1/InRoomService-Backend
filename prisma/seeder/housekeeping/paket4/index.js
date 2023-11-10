const { cleaningSheetSeed } = require("./cleaningSheet.seeder");
const { cleanRoomSeed } = require("./cleanRoom.seeder");
const { dirtyRoomSeed } = require("./dirtyRoom.seeder");
const { oooRoomSeed } = require("./oooRoom.seeder");
async function paketEmpatSeed() {
  cleaningSheetSeed();
  cleanRoomSeed();
  dirtyRoomSeed();
  oooRoomSeed();
}

module.exports = { paketEmpatSeed };
