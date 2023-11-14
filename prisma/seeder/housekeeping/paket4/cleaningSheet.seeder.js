const { prisma } = require("../../config");

const cleaningSheets = [
  {
    userId: 1,
    reservationId: 1,
    no: "010",
    resvStatusId: 1,
    remark: "Cleaning in progress",
    roomId: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function cleaningSheetSeed() {
  for (let cleaningSheet of cleaningSheets) {
    await prisma.cleaningSheet.create({
      data: cleaningSheet,
    });
  }
}

module.exports = { cleaningSheetSeed };
