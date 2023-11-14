const { prisma } = require("../../config");

const purchases = [
  {
    stock_id: 1,
    number: '123',
    issue: new Date(),
    art_no: '123',
    user_id: 1,
    description: 'abc',
    qty: 123,
    date: new  Date(),
    d_unit: 'abc',
    cont: 'abc',
    po: 'abc',
  },
];

async function purchaseSeed() {
  for (let purchase of purchases) {
    await prisma.purchase.create({
      data: purchase,
    });
  }
}

module.exports = { purchaseSeed };