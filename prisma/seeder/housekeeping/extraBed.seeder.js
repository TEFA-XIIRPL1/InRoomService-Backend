const { prisma } = require("../config");

const extraBeds = [
  {
    roomId: 1,
    date: new Date(),
    used: false,
    remain: 123,
  },
  {
    roomId: 1,
    date: new Date(),
    used: true,
    remain: 321,
  },
];

async function extraBedSeed() {
  for (let extraBed of extraBeds) {
    await prisma.extraBed.create({
      data: extraBed,
    });
  }
}

module.exports = { extraBedSeed };
