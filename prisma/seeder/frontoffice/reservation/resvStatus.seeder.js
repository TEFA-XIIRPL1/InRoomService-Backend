const { prisma } = require("../../config");

const resvStatus = [
	{
		description: "Guaranted",
		rowColor: "#321313",
		textColor: "#128937"
	},
	{
		description: "Canceled",
		rowColor: "#384298",
		textColor: "#985345", 
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
