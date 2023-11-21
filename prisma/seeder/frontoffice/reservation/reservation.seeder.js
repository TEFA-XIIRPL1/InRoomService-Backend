const { prisma } = require("../../config");

const reservation = [
	{
		resvStatusId: 1,
		arrangmentCode: "RB",
		reserverId: 1,
		manyAdult: 2,
		manyChild: 3,
		inHouseIndicator: false,
		arrivalDate: new Date(),
		departureDate: new Date(),
		created_at: new Date(),
		updated_at: new Date()
	},
];

async function ReservationSeed() {
	for (let Reservation of reservation) {
		await prisma.Reservation.create({
			data: Reservation,
		});
	}
}
module.exports = { ReservationSeed };
