const express = require('express');
const { z } = require('zod');

const router = express.Router();

const auth = require('../services/auth.service');
const middleware = require('../middlewares/auth.middleware');
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
    roleId: z.number({
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

router.post('/register', validate(RegisterSchema), auth.register);

router.post('/login', validate(LoginScheme), auth.login);

// middleware
router.use(middleware.checkToken);
router.get('/refresh', auth.refresh);

router.use(middleware.authToken);
router.get('/logout', auth.logout);

module.exports = router;
