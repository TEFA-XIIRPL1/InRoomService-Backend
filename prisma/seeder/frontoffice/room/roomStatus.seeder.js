const { prisma } = require("../../config");

const roomStatuses = [
  {
    shortDescription: "VC",
    longDescription: "Vacant Clean",
    rowColor: "#ffffff",
    textColor: "",
  },
  {
    shortDescription: "VCU",
    longDescription: "Vacant Clean Uncheck",
    rowColor: "#ffffff",
    textColor: "#fdfd06",
  },
  {
    shortDescription: "VD", 
    longDescription: "Vacant Dirty",
    rowColor: "#10780a",
    textColor: "",
  },
  {
    shortDescription: "OD",
    longDescription: "Occupied Dirty",
    rowColor: "#fffc06",
    textColor: "",
  },
  {
    shortDescription: "OC",
    longDescription: "Occupied Clean",
    rowColor: "#f8fdf7",
    textColor: "",
  },
  {
    shortDescription: "EAD",
    longDescription: "EAD",
    rowColor: "#33e02f",
    textColor: "",
  },
  {
    shortDescription: "ED",
    longDescription: "ED",
    rowColor: "#020176",
    textColor: "",
  },
  {
    shortDescription: "DD",
    longDescription: "Do Not Distrub",
    rowColor: "#850179",
    textColor: "",
  },
  {
    shortDescription: "OOO",
    longDescription: "Out Of Order",
    rowColor: "#f80203",
    textColor: "#f80203",
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
