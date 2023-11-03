const { prisma } = require("../../config");

const payments = [
  {
    name: "BCA",
    code: "BCAVA",
    paymentMethodId: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Mandiri",
    code: "MandiriVA",
    paymentMethodId: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "BRI",
    code: "BRIVA",
    paymentMethodId: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "BNI",
    code: "BNIVA",
    paymentMethodId: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "QRIS",
    code: "DANAQRIS",
    paymentMethodId: 3,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function paymentSeed() {
  for (let payment in payments) {
    await prisma.payment.create({
      data: payments[payment],
    });
  }
}

module.exports = { paymentSeed };
