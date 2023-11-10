const { ReservationSeed } = require("./reservation.seeder");
const { ReserverSeed } = require("./reserver.seeder");
const { ResvRoomSeed } = require("./resvRoom.seeder");
const { ResvQtySeed } = require("./resvQty.seeder");
const { ResvStatusSeed } = require("./resvStatus.seeder");
const { ResvFlightSeed } = require("./resvFlight.seeder");
const { VoucherSeed } = require("./voucher.seeder");

async function ReservationBatchSeed() {
	// important to seed in order
	await ReserverSeed(); //#3
	await ResvQtySeed(); // #2
	await ResvStatusSeed(); // #1
	await ReservationSeed(); //#4
	await ResvRoomSeed(); //#5
	await ResvFlightSeed(); //#6
	await VoucherSeed(); //#7
}

module.exports = { ReservationBatchSeed };
