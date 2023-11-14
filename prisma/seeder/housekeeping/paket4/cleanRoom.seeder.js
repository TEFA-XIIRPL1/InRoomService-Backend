const { prisma } = require("../../config");

const cleanRooms = [
  {
    userId: 1,
    reservationId: 1,
    resvStatusId: 2,
    description: "Room cleaned thoroughly, ready for next guest.",
    roomId: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function cleanRoomSeed() {
  for (let cleanRoom of cleanRooms) {
    await prisma.cleanRoom.create({
      data: cleanRoom,
    });
  }
}

module.exports = { cleanRoomSeed };
