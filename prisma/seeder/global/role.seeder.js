const { prisma } = require("../config");

const roles = [
  {
    name: "Super Admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Admin",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Room Boy",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function roleSeed() {
  for (let role of roles) {
    await prisma.role.create({
      data: role,
    });
  }
}

module.exports = { roleSeed };
