const { prisma } = require('../../config');

const roomStatuses = [
  {
    shortDescription: 'VC',
    longDescription: 'Vacant Clean',
    rowColor: '#ffffff',
    textColor: '#000000',
  },
  {
    shortDescription: 'VCU',
    longDescription: 'Vacant Clean Uncheck',
    rowColor: '#02feff',
    textColor: '#000000',
  },
  {
    shortDescription: 'VD',
    longDescription: 'Vacant Dirty',
    rowColor: '#10780A',
    textColor: '#ffffff',
  },
  {
    shortDescription: 'OD',
    longDescription: 'Occupied Dirty',
    rowColor: '#0000F1',
    textColor: '#ffffff',
  },
  {
    shortDescription: 'OC',
    longDescription: 'Occupied Clean',
    rowColor: '#f8fdf7',
    textColor: '#0000f1',
  },
  {
    shortDescription: 'ED',
    longDescription: 'Expected Departure',
    rowColor: '#FFFC06',
    textColor: '#F10000',
  },
  {
    shortDescription: 'DnD',
    longDescription: 'Do not Distrub',
    rowColor: '#850179',
    textColor: '#ffffff',
  },
  {
    shortDescription: 'OO',
    longDescription: 'Out of Order',
    rowColor: '#000000',
    textColor: '#F10000',
  },
  {
    shortDescription: 'OM',
    longDescription: 'Out of Market',
    rowColor: '#000000',
    textColor: '#F10000',
  },
];

async function roomStatusSeed() {
  for (const roomStatus of roomStatuses) {
    await prisma.roomStatus.create({
      data: roomStatus,
    });
  }
}

module.exports = {
  roomStatusSeed,
};
