const { prisma } = require("../../config");

const guestPreferences = [
  {
    roomId: 1,
    reservationId: 1,
    datetime: new Date(),
    remark: "Success",
	created_at: new Date(),
	updated_at: new Date(),
  },
];

async function guestPreferenceSeed() {
  for (let guestPreference of guestPreferences) {
    await prisma.guestPreference.create({
      data: guestPreference,
    });
  }
}

module.exports = { guestPreferenceSeed };