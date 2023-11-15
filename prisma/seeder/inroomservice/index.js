const { serviceBatchSeed } = require('./services');
const { paymentMethodSeed } = require('./payment/paymentMethod.seeder');
const { paymentSeed } = require('./payment/payment.seeder');
const { productReqSeed } = require('./services/productReq.seeder');

async function inRoomServiceBatchSeed() {
  /* service seeed */
  await serviceBatchSeed();
  /* service seeed end */

  /* payment seeed */
  await paymentMethodSeed(); // important to seed paymentMethod first before payment
  await paymentSeed();
  /* payment seeed end */
}

module.exports = { inRoomServiceBatchSeed };
