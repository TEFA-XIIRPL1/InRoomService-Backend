const { prisma } = require("../config");

const departments = [
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

async function departmentSeed() {
  for (let department of departments) {
    await prisma.department.create({
      data: department,
    });
  }
}

module.exports = { departmentSeed };
