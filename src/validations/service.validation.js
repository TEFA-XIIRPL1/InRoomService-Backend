const { z } = require('zod');
const { validate } = require('../utils/helper.util');

const CreateServiceScheme = z.object({
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
    picture: z.picture({
      required_error: 'picture',
    }),
    serviceTypeId: z.unknown({
      required_error: 'Service Type ID is Required',
    }),
  }),
});

const createServiceValidation = validate(CreateServiceScheme);

module.exports = { createServiceValidation };
