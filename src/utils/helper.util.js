const jwt = require('jsonwebtoken');
const { z } = require('zod');
const crypto = require('crypto');
const fs = require('fs');
const multer = require('multer');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime/library');
const config = require('../configs/general.config');
const { prisma } = require('../configs/prisma.config');

function getOffset(listPerPage, currentPage = 1) {
  return (currentPage - 1) * [listPerPage];
}

function paginator(defaultOptions) {
  return async (model, options, args = { where: undefined }) => {
    try {
      const page = Number(options?.page || defaultOptions.page) || 1;
      const perPage = Number(options?.perPage || defaultOptions.perPage) || 10;

      const skip = (page - 1) * perPage;
      const [data, total] = await Promise.all([
        model.findMany({
          ...args,
          skip,
          take: perPage,
        }),
        model.count({
          where: args.where,
        }),
      ]);
      const lastPage = Math.ceil(total / perPage);

      return {
        data,
        meta: {
          total,
          currPage: page,
          lastPage,
          perPage,
          prev: page > 1 ? page - 1 : null,
          next: page < lastPage ? page + 1 : null,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  };
}

const paginate = paginator({ perPage: 10 });

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

/**
 * @param {import('express').Response} res
 */

function errorResponse(res, message, data, code = 500) {
  res.status(code).json({ success: false, message, data });
}

/**
 * @param {import('express').Response} res
 */

function successResponse(res, message, data, code = 200) {
  res.status(code).json({ success: true, message, data });
}

function generateToken(payload) {
  const [at, rt] = [
    jwt.sign(
      {
        id: payload.id,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      },
      config.secret,
      {
        expiresIn: 60 * 15,
      },
    ),
    crypto.randomBytes(30).toString('hex'),
  ];

  return { at, rt };
}

/**
 * @param {import('express').Request} req
 */

function getAccessToken(req) {
  return req.headers.authorization.split(' ')[1];
}

function verifyToken(token) {
  try {
    const payload = jwt.verify(token, config.secret);
    if (payload === null || !payload) throw new Error('Invalid token');
    return payload;
  } catch (error) {
    return error;
  }
}

/**
 * @param {z.ZodSchema<object>} scheme
 */
function validate(scheme) {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  return (req, res, next) => {
    try {
      scheme.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return errorResponse(res, error.errors[0].message, null, 400);
      }
      return errorResponse(res, 'Internal server error', error.message, 500);
    }
  };
}

/* Encryption */
const key = crypto
  .createHash('sha256')
  .update(config.cryptoSecret)
  .digest('base64')
  .substring(0, 32);
const iv = crypto.createHash('sha256').update(config.cryptoIv).digest('base64').substring(0, 16);

function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

function decrypt(text) {
  const encryptedText = Buffer.from(text, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
/* Encryption End */

/* File */
function getFilePath(url) {
  const fileName = url.split('/').pop();
  return `./public/assets/images/${fileName}`;
}

function generateAssetUrl(fileName) {
  return `${process.env.BASE_URL}/public/assets/images/${fileName}`;
}

function deleteAsset(path) {
  if (fs.existsSync(path) && !path.split('/').pop() === '') {
    fs.unlinkSync(path);
  }
}

function setStorage() {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/assets/images');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  return storage;
}

function setFileFilter(
  allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'],
  fileSize = 1024 * 1024 * 5,
) {
  return (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error('Incorrect file');
      error.code = 'INCORRECT_FILETYPE';
      cb(error, false);
    } else if (file.size > fileSize) {
      const error = new Error('File size is too large');
      error.code = 'FILE_TOO_LARGE';
      cb(error, false);
    }
    cb(null, true);
  };
}

/**
 * @param {import('multer').Options} options
 */

function uploadFile(options, fieldName = 'image') {
  const upload = multer(options).single(fieldName);

  return (req, res, next) =>
    upload(req, res, (err) => {
      if (err) {
        return errorResponse(res, err.message, null, 422);
      }
      if (!req.file) {
        return errorResponse(res, `${fieldName} is required`, null, 400);
      }
      return next();
    });
}

/* File End */

/* Order Helper */

/**
 * @param { {serviceId:number, qty:number}[] } items
 */
async function generateSubtotal(items) {
  let subTotal = 0;

  const services = await prisma.service.findMany({
    where: {
      id: {
        in: items.map((item) => parseInt(item.serviceId, 10)),
      },
    },
  });

  for (const item of items) {
    const service = services.find((s) => s.id === parseInt(item.serviceId, 10));

    if (!service) {
      const err = new PrismaClientKnownRequestError('Service not found', {
        code: 'P2025',
        meta: {
          target: ['service id'],
        },
      });
      throw err;
    }

    subTotal += service.price * parseInt(item.qty, 10);
  }

  return subTotal;
}

/**
 * @param {number} subTotal
 */
function generateTotal(subTotal) {
  const ppn = subTotal * 0.1;
  const fees = 1000;
  const total = subTotal + ppn + fees;

  return total;
}

/**
 * @param {number} id
 * @param {number} qty
 */

async function generateItemPrice(id, qty) {
  const service = await prisma.service.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  if (!service)
    throw new PrismaClientKnownRequestError('Service not found', {
      code: 'P2025',
      meta: {
        target: ['id'],
      },
    });

  return service.price * parseInt(qty, 10);
}

/* Order Helper End */

module.exports = {
  generateItemPrice,
  generateSubtotal,
  generateTotal,
  uploadFile,
  setFileFilter,
  setStorage,
  deleteAsset,
  getFilePath,
  generateAssetUrl,
  getAccessToken,
  validate,
  verifyToken,
  getOffset,
  emptyOrRows,
  errorResponse,
  successResponse,
  generateToken,
  encrypt,
  decrypt,
  paginate,
};
