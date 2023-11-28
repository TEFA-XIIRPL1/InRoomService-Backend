const { prisma } = require("../config");

const oooRooms = [
  {
    roomId: 1,
    userId: 1,
    reservationId: 1,
    reason:
      "Maintenance work in progress. Room will be unavailable for the next few days.",
    from: new Date(),
    until: new Date(),
    resvStatusId: 1,
    description: "Room cleaned thoroughly, ready for next guest.",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function oooRoomSeed() {
  for (const oooRoom of oooRooms) {
    await prisma.oooRoom.create({
      data: oooRoom,
    });
  }
}

module.exports = { oooRoomSeed };
