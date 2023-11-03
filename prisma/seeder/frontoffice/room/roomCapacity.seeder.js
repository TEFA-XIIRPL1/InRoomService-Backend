const { prisma } = require("../../config");

const roomCapacities = [
  {
    adultCapacity: 2,
    childCapacity: 1,
    manyRoom: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function roomCapacitySeed() {
  for (let roomCapacity of roomCapacities) {
    await prisma.roomCapacity.create({
      data: roomCapacity,
    });
  }
}

module.exports = { roomCapacitySeed };
