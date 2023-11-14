const { prisma } = require("../../config");

const roomStatuses = [
  {
    description: "Vacant Clean",
    hexCode: "#ffffff",
    availHexCode: "",
  },
  {
    description: "Vacant Clean Uncheck",
    hexCode: "#ffffff",
    availHexCode: "#fdfd06",
  },
  {
    description: "Vacant Dirty",
    hexCode: "#10780a",
    availHexCode: "",
  },
  {
    description: "Occupied Dirty",
    hexCode: "#fffc06",
    availHexCode: "",
  },
  {
    description: "Occupied Clean",
    hexCode: "#f8fdf7",
    availHexCode: "",
  },
  {
    description: "EAD",
    hexCode: "#33e02f",
    availHexCode: "",
  },
  {
    description: "ED",
    hexCode: "#020176",
    availHexCode: "",
  },
  {
    description: "DD",
    hexCode: "#850179",
    availHexCode: "",
  },
  {
    description: "Out Of Order",
    hexCode: "#f80203",
    availHexCode: "#f80203",
  },
];

async function roomStatusSeed() {
  for (let roomStatus of roomStatuses) {
    await prisma.roomStatus.create({
      data: roomStatus,
    });
  }
}

module.exports = {
  roomStatusSeed,
};
