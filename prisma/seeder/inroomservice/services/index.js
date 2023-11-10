const { productReqSeed } = require('./productReq.seeder');
const { serviceSeed } = require('./service.seeder');
const { serviceTypeSeed } = require('./serviceType.seeder');
const { subTypeSeed } = require('./subType.seeder');

async function serviceBatchSeed() {
  // the order of seeding is important
  await serviceTypeSeed(); // #1
  await subTypeSeed(); // #2
  await serviceSeed(); // #3
  await productReqSeed();
}

module.exports = { serviceBatchSeed };
