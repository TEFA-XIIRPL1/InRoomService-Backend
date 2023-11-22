const { z } = require('zod');
const { validate } = require('../utils/helper.util');

const productReqInputScheme = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    price: z.string({
      required_error: 'Price is required',
    }),
    desc: z.string({
      required_error: 'Desc is required',
    }),
    picture: z.unknown({
      required_error: 'picture',
    }),
    serviceTypeId: z.string({
      required_error: 'Service Type ID is Required',
    }),
    typeId: z.string({
      required_error: 'Type ID is Required',
    }),
  }),
});

const productReqInputValidation = validate(productReqInputScheme);

module.exports = { productReqInputValidation };
