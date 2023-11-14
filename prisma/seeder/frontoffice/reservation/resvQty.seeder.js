const { prisma } = require("../../config");

const resvQty = [
	{
		manyAdult: 2,
		manyChild: 0,
		manyRoom: 1,
		created_at: new Date(),
		updated_at: new Date(),
	},
];
async function ResvQtySeed() {
	for (let ResvQty of resvQty) {
		await prisma.ResvQty.create({
			data: ResvQty,
		});
	}
}

module.exports = { ResvQtySeed };
