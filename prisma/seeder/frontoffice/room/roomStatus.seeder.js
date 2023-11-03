const { prisma } = require("../../config");

const roomStatuses = [
  {
    description: "Available",
    hexCode: "#00ff00",
    availHexCode: "#00ff00",
  },
];

async function roomStatusSeed() {
  for (let roomStatus of roomStatuses) {
    await prisma.roomStatus.create({
      data: roomStatus,
    });
  }
}

module.exports = {
  roomStatusSeed,
};
