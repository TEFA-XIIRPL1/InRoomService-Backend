const { prisma } = require("../config");

const lostFounds = [
  {
    roomId: 1,
    reference: "Test reference",
    time: new Date(),
    reported: new Date(),
    location: "Lobby",
    description: "Room cleaned thoroughly, ready for next guest.",
    picture: "https://random.imagecdn.app/500/300",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function lostFoundSeed() {
    for (let lostFound of lostFounds) {
      await prisma.lostFound.create({
        data: lostFound,
      });
    }
  }

  module.exports = { lostFoundSeed };
