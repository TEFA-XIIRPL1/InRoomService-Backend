const { prisma } = require("../../config");

const stocks = [
  {
    article: 'abc',
    description: 'abc',
    unit: 'abc',
    qty:  123,
    content: 'abc',
    d_unit: 'abc',
  },
];

async function stockSeed() {
  for (let stock of stocks) {
    await prisma.stock.create({
      data: stock,
    });
  }
}

module.exports = { stockSeed };