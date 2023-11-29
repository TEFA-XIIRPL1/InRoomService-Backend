const { prisma } = require("../../config");

const resvStatus = [
	{
		description: "Guaranted",
		rowColor: "#16a75c",
		textColor: "#ffffffD"
	},
	{
		description: "6 PM",
		rowColor: "#fffc06",
		textColor: "#000000", 
	},
	{
		description: "Tentative",
		rowColor: "#fe0001",
		textColor: "#ffffff"
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
