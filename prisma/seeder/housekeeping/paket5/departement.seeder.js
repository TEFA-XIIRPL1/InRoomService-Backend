const { prisma } = require("../../config");

const departements = [
  {
    name: "House Keeping"
  },

  {
    name: "Front Office"
  },

  {
    name: "In Room Service"
  },
];

async function departementSeed() {
  for (let departement of departements) {
    await prisma.departement.create({
      data: departement,
    });
  }
}

module.exports = { departementSeed };