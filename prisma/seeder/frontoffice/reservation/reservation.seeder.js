const { prisma } = require("../../config");

const reservation = [
	{
		agencyName: "Traveloka",
		resvQtyId: 1,
		resvStatusId: 1,
		groupReservation: true,
		finishedReservation: true,
		currency: "Rp.2.000.000",
		code: "AA",
		reserverId: 1,
		fixRate: true,
		m: "m",
		l: "l",
		argtCode: "RB",
		day: 2,
		night: 1,
		arrivalDate: new Date(),
		departureDate: new Date(),
		checkoutDate: new Date(),
		canceledDate: new Date(),
		created_at: new Date(),
		updated_at: new Date(),
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
