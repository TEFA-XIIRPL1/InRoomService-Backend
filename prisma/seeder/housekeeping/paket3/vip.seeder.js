const { prisma } = require("../../config");

const vips = [
  {
    res_no: '123',
    qty: 111,
    // category: '',
    // res_status: '',
    argt_code: '222',
    description: 'abc',
    a: 'abc',
    co: 'abc',
    room_id: 1,
    reservation_id: 1,
  },
];

async function vipSeed() {
  for (let vip of vips) {
    await prisma.vip.create({
      data: vip,
    });
  }
}

module.exports = { vipSeed };