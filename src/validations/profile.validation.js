const { z } = require('zod');
const { validate } = require('../utils/helper.util');

const phoneInputScheme = z.object({
  body: z.object({
    phone: z.string({
      required_error: 'Phone Number is required',
    }),
  }),
});

const emailInputScheme = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
  }),
});

const nikInputScheme = z.object({
  body: z.object({
    nik: z.string({
      required_error: 'NIK is required',
    }),
  }),
});

const phoneValidation = validate(phoneInputScheme);
const emailValidation = validate(emailInputScheme);
const nikValidation = validate(nikInputScheme);

module.exports = { phoneValidation, emailValidation, nikValidation };
