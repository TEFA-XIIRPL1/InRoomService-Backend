const { prisma } = require("../../config");

const dirtyRooms = [
  {
    userId: 1,
    reservationId: 1,
    resvStatusId: 2,
    description:
      "Room requires thorough cleaning. Stains on the carpet and beddings need attention.",
    roomId: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function dirtyRoomSeed() {
  for (let dirtyRoom of dirtyRooms) {
    await prisma.dirtyRoom.create({
      data: dirtyRoom,
    });
  }
}

module.exports = { dirtyRoomSeed };
