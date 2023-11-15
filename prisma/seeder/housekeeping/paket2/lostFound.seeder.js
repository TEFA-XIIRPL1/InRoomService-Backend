const { prisma } = require('../../config');

const lostFounds = [
  {
    roomId: 1,
    reference: 'Test reference',
    time: new Date(),
    reported: new Date(),
    location: 'Lobby',
    description: 'Room cleaned thoroughly, ready for next guest.',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function lostFoundSeed() {
  for (const lostFound of lostFounds) {
    await prisma.lostfound.create({
      data: lostFound,
    });
  }
}

module.exports = { lostFoundSeed };
