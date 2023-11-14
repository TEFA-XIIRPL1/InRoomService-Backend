const { prisma } = require("../../config");

const tasks = [
  {
    roomId: 1,
    reservationId: 1,
    departementId: 1,
    from: new Date(),
    to: new Date(),
    done: true,
    note: "Selesai",
	created_at: new Date(),
	updated_at: new Date(),
  },
];

async function taskSeed() {
  for (let task of tasks) {
    await prisma.task.create({
      data: task,
    });
  }
}

module.exports = { taskSeed };