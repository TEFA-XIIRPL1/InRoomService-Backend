const { prisma } = require("../../config");

const paymentMethods = [
  {
    name: "Cash",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Transfer",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "QRIS",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function paymentMethodSeed() {
  for (let method in paymentMethods) {
    await prisma.paymentMethod.create({
      data: paymentMethods[method],
    });
  }
}

module.exports = { paymentMethodSeed };
