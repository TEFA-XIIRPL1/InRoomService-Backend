const { prisma } = require("../../config");

const roomFacilities = [
  {
    name: "Savana Room",
    roomId: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Water Heater",
    roomId: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function roomFacilitySeed() {
  for (let roomFacility of roomFacilities) {
    await prisma.roomFacility.create({
      data: roomFacility,
    });
  }
}

module.exports = { roomFacilitySeed };
