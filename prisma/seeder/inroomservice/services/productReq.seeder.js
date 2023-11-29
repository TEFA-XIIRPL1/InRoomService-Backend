const { prisma } = require("../../config");

const productReqs = [
  {
    userId: 1,
    title: "CHOCOPIE",
    typeId: 2,
    desc: "Chocolate yang dicampur dengan durian",
    price: 2000,
    picture: "https://i.pravatar.cc/300",
    serviceTypeId: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    userId: 1,
    title: "Nipis Madu",
    typeId: 1,
    desc: "Cairan berwarna hijau",
    price: 4000,
    picture: "https://i.pravatar.cc/300",
    serviceTypeId: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function productReqSeed() {
  for (let productReq of productReqs) {
    await prisma.productReq.create({
      data: productReq,
    });
  }
}

module.exports = { productReqSeed };
