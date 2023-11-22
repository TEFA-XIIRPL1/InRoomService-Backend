const { prisma } = require('../../config');

const reserver = [
  {
    guestIdentifier: 'John Doe',
    resourceName: 'Whatsapp',
    guestId: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
async function ReserverSeed() {
  for (const Reserver of reserver) {
    await prisma.Reserver.create({
      data: Reserver,
    });
  }
}

module.exports = { ReserverSeed };
