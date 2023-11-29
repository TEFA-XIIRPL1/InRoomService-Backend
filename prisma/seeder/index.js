const { prisma } = require("./config");
const { frontOfficeBatchSeed } = require("./frontoffice");
const { roleSeed } = require("./global/role.seeder");
const { tokenSeed } = require("./global/token.seeder");
const { userSeed } = require("./global/user.seeder");
const { inRoomServiceBatchSeed } = require("./inroomservice");
const { houseKeepingSeed } = require("./housekeeping");

async function main() {
  /* front office seeed */
  await frontOfficeBatchSeed();
  /* front office seeed end */

  /* user seeed */
  await roleSeed(); // important to seed role first before user
  await userSeed();

  /* token seeed */
  await tokenSeed(); // important to seed token after user

  /* user seeed end */

  /* in room service seeed */
  await inRoomServiceBatchSeed();
  /* in room service end */

  /*House Keeping seed */
  await houseKeepingSeed();
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
