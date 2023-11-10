const { prisma } = require("../../config");

const extraBeds = [
  {
    room_id: 1,
    date: new Date(),
    // used_String:'',
    remain: 123,
  },
];

async function extraBedSeed() {
  for (let extraBed of extraBeds) {
    await prisma.extrabed.create({
      data: extraBed,
    });
  }
}

module.exports = { extraBedSeed };