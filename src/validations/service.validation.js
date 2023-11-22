const { z } = require('zod');
const { validate } = require('../utils/helper.util');

const ServiceInputScheme = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
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
    subTypeId: z.string({
      required_error: 'Sub Type ID is Required',
    }),
  }),
});

const serviceInputValidation = validate(ServiceInputScheme);

module.exports = { serviceInputValidation };
