const { prisma } = require("../../config");

const serviceTypes = [
  {
    name: "Mini Market",
    open: "07:00",
    close: "22:00",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "FnB",
    open: "07:00",
    close: "22:00",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Laundry",
    open: "07:00",
    close: "22:00",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function serviceTypeSeed() {
  for (let serviceType of serviceTypes) {
    await prisma.serviceType.create({
      data: serviceType,
    });
  }
}

module.exports = { serviceTypeSeed };
