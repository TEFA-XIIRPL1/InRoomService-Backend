const jwt = require('jsonwebtoken');
const { z } = require('zod');
const crypto = require('crypto');
const fs = require('fs');
const config = require('../configs/general.config');

function getOffset(listPerPage, currentPage = 1) {
  return (currentPage - 1) * [listPerPage];
}

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
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}

/* File End */

module.exports = {
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
};
