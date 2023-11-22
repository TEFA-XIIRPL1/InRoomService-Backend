const { prisma } = require("../config");

const roomChanges = [
  {
    roomFromId: 1,
    roomToId: 1,
    resvRoomId: 1,
    note: 'room change note here...'
  },
];

async function roomChangeSeed() {
  for (let roomChange of roomChanges) {
    await prisma.roomChange.create({
      data: roomChange,
    });
  }
}

module.exports = { roomChangeSeed };
