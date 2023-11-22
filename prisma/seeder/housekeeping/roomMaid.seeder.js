const { prisma } = require("../config");

async function roomMaidSeed() {
  const roomMaids = [
    {
      userId: 1,
      roomStatusId: 1,
      departementId: 2,
      no: "A01",
      done: true,
      from: new Date(),
      to: new Date(),
      note: "Some room maid note..."
    },
    {
      userId: 1,
      roomStatusId: 2,
      departementId: 2,
      no: "A02",
      done: false,
      from: new Date(),
      to: new Date(),
      note: "foo bar baz"
    }
  ];

	for (const roomMaid of roomMaids) {
    prisma.roomMaid.create({
      data: roomMaid,
    });
	}
}

module.exports = { roomMaidSeed };
