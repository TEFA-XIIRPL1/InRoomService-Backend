const { prisma } = require("../../config");

const reservation = [
	{
		resvStatusId: 1,
		arrangmentCode: "RB",
		reserverId: 1,
		manyAdult: 2,
		manyChild: 3,
		manyBaby: 2,
		inHouseIndicator: false,
		arrivalDate: new Date(),
		departureDate: new Date(),
		created_at: new Date(),
		updated_at: new Date()
	},
];

const calculateNights = (arrivalDate, departureDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const nights = Math.round(Math.abs((departureDate - arrivalDate) / oneDay));
    return nights;
};

async function ReservationSeed() {
	for (let Reservation of reservation) {
		Reservation.manyNight = calculateNights(Reservation.arrivalDate, Reservation.departureDate)
		await prisma.Reservation.create({
			data: Reservation,
		});
	}
}
module.exports = { ReservationSeed };
