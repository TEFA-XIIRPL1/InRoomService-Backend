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

const RegisterSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Email is invalid'),
    password: z.string({
      required_error: 'Password is required',
    }),
    name: z.string({
      required_error: 'Name is required',
    }),
    phone: z
      .string({
        required_error: 'Phone is required',
      })
      .min(11, 'Phone must be 11 characters'),
    roleId: z.string({
      required_error: 'Role is required',
    }),
    nik: z
      .string({
        required_error: 'NIK is required',
      })
      .min(16, 'NIK must be 16 characters'),
    gender: z.enum(['MALE', 'FEMALE'], {
      required_error: 'Gender is required',
    }),
  }),
});

const loginValidation = validate(RegisterSchema);
const registerValidation = validate(LoginScheme);

module.exports = { loginValidation, registerValidation };
