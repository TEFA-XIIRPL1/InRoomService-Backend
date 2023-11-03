const { prisma } = require("../../config");

const rooms = [
  {
    roomType: "STANDARD",
    roomImage: "https://i.pravatar.cc/300",
    roomStatusId: 1,
    roomCode: 1,
    roomCapacityId: 1,
    category: "well",
    floor: 3,
    i: 2,
    occupied_status: true,
    overlook: "well",
    description: "kamar well",
    bedSetup: "well",
    connecting: "well",
    rateCodeId: 1,
  },
];

async function roomSeed() {
  for (let room of rooms) {
    await prisma.room.create({
      data: room,
    });
  }
}

module.exports = { roomSeed };
