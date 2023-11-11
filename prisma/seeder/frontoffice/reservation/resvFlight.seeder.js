const { prisma } = require("../../config");

const resvFlight = [
	{
		reservationId: 1,
		arrivalFlight: new Date(),
		departureFlight: new Date(),
		pickedUp: true,
		drop: false,
		created_at: new Date(),
		updated_at: new Date(),
	},
];

async function ResvFlightSeed() {
	for (let ResvFlight of resvFlight) {
		await prisma.ResvFlight.create({
			data: ResvFlight,
		});
	}
}

module.exports = { ResvFlightSeed };
