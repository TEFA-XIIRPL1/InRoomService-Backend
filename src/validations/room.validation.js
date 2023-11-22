const { z } = require('zod');
const { validate } = require('../utils/helper.util');

const LoginScheme = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Email is invalid'),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const registerValidation = validate(LoginScheme);

module.exports = { registerValidation };
