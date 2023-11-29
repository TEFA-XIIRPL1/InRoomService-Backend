const { prisma } = require('../../config');

const services = [
  {
    userId: 1,
    name: 'Betadine Wound',
    price: 8500,
    desc: '5ml',
    picture: 'https://i.pravatar.cc/300',
    serviceTypeId: 1,
    subTypeId: 4,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function serviceSeed() {
  for (const service of services) {
    await prisma.service.create({
      data: service,
    });
  }
}

module.exports = { serviceSeed };
