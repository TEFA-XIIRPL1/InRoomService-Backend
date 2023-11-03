const { prisma } = require("../../config");

const subTypes = [
  {
    name: "Drink",
    serviceTypeId: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Food",
    serviceTypeId: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Cleaning Tool",
    serviceTypeId: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Medicine",
    serviceTypeId: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function subTypeSeed() {
  for (let subType of subTypes) {
    await prisma.subType.create({
      data: subType,
    });
  }
}

module.exports = { subTypeSeed };
