const { prisma } = require("../../config");

const reserver = [
	{
		groupName: "Vincenzo",
		kCard: "BCA",
		nation: "Indonesia",
		purpose: "Business",
		resident: "Yes",
		guestId: 1,
		created_at: new Date(),
		updated_at: new Date(),
	},
];
async function ReserverSeed() {
	for (let Reserver of reserver) {
		await prisma.Reserver.create({
			data: Reserver,
		});
	}
}

module.exports = { ReserverSeed };
