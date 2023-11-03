const { prisma } = require("../../config");

const roomRates = [
  {
    rate: 100000,
  },
];

async function roomRateSeed() {
  for (let roomRate of roomRates) {
    await prisma.roomRate.create({
      data: roomRate,
    });
  }
}

module.exports = { roomRateSeed };
