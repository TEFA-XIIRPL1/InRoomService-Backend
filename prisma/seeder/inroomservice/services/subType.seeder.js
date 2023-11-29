const { prisma } = require("../../config");

const subTypes = [
  {
    name: "Drink",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Food",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Cleaning Tool",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Medicine",
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
