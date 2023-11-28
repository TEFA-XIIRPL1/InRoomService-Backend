const { prisma } = require('../../config');

const rooms = [
  {
    roomType: 'STANDARD',
    roomImage: 'https://i.pravatar.cc/300',
    roomStatusId: 1,
    roomCapacityId: 1,
    floor: 3,
    occupied_status: true,
    description: 'kamar well',
    bedSetup: 'KING',
    rate: 240000,
  },
];

async function roomSeed() {
  for (const room of rooms) {
    await prisma.room.create({
      data: room,
    });
  }
}

module.exports = { roomSeed };
