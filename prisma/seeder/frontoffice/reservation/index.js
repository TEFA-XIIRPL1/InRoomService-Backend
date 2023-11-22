const { ReservationSeed } = require("./reservation.seeder");
const { ReserverSeed } = require("./reserver.seeder");
const { ResvRoomSeed } = require("./resvRoom.seeder");
const { ResvStatusSeed } = require("./resvStatus.seeder");

async function ReservationBatchSeed() {
	// important to seed in order
	await ReserverSeed(); //#3
	await ResvStatusSeed(); // #1
	await ReservationSeed(); //#4
	await ResvRoomSeed(); //#5
}

module.exports = { ReservationBatchSeed };
