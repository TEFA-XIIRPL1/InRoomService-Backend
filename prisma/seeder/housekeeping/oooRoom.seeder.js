<<<<<<< HEAD
const { prisma } = require('../config');
=======
const { prisma } = require("../config");
>>>>>>> a1edbb3a2c64d7db4d6962b862308e64b96786f4

const oooRooms = [
  {
    roomId: 1,
    userId: 1,
    reservationId: 1,
<<<<<<< HEAD
    reason: 'Maintenance work in progress. Room will be unavailable for the next few days.',
    from: new Date(),
    until: new Date(),
    resvStatusId: 1,
    description: 'Room cleaned thoroughly, ready for next guest.',
=======
    reason:
      "Maintenance work in progress. Room will be unavailable for the next few days.",
    from: new Date(),
    until: new Date(),
    resvStatusId: 1,
    description: "Room cleaned thoroughly, ready for next guest.",
>>>>>>> a1edbb3a2c64d7db4d6962b862308e64b96786f4
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function oooRoomSeed() {
<<<<<<< HEAD
  for (const oooRoom of oooRooms) {
=======
  for (let oooRoom of oooRooms) {
>>>>>>> a1edbb3a2c64d7db4d6962b862308e64b96786f4
    await prisma.oooRoom.create({
      data: oooRoom,
    });
  }
}

module.exports = { oooRoomSeed };
