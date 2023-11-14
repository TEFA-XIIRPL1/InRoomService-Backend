const { prisma } = require("../../config");

const resvStatus = [
	{
		desc: "Guaranted",
		hexCode: "",
	},
	{
		desc: "Canceled",
		hexCode: "#fe0001",
	}
];
async function ResvStatusSeed() {
	for (let ResvStatus of resvStatus) {
		await prisma.ResvStatus.create({
			data: ResvStatus,
		});
	}
}

module.exports = { ResvStatusSeed };
