const { prisma } = require("./config");
const { frontOfficeBatchSeed } = require("./frontoffice");
const { roleSeed } = require("./global/role.seeder");
const { userSeed } = require("./global/user.seeder");
const { inRoomServiceBatchSeed } = require("./inroomservice");

async function main() {
  /* front office seeed */
  await frontOfficeBatchSeed();
  /* front office seeed end */

  /* user seeed */
  await roleSeed(); // important to seed role first before user
  await userSeed();
  /* user seeed end */

  /* in room service seeed */
  await inRoomServiceBatchSeed();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  });
