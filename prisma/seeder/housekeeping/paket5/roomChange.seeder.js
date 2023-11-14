const { prisma } = require("../../config");

const roomChanges = [
  {
    roomFromId: 1,
    roomToId: 1,
    reservationId: 1,
	created_at: new Date(),
	updated_at: new Date(),
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