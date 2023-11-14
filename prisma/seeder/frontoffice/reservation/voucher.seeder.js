const { prisma } = require("../../config");

const voucher = [
	{
		name: "New Year Gift",
		number: 421761873,
		source: "Traveloka",
		letterNo: 1234,
		holderName: "Louis",
		cardNumber: 121831617,
		securityCode: 1923,
		expired_at: new Date(),
		updated_at: new Date(),
		created_at: new Date(),
		reservationId: 1,
	},
];
async function VoucherSeed() {
	for (let Voucher of voucher) {
		await prisma.Voucher.create({
			data: Voucher,
		});
	}
}

module.exports = { VoucherSeed };
