const jwt = require('jsonwebtoken');
const { z } = require('zod');
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

function errorResponse(res, message, data, code = 500) {
  return res.status(code).json({ success: false, message, data });
}

function successResponse(res, message, data, code = 200) {
  return res.status(code).json({ success: true, message, data });
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
    jwt.sign(
      {
        id: payload.id,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      },
      config.secret,
      {
        expiresIn: '30d',
      },
    ),
  ];

  return { at, rt };
}

function decodeToken(token) {
  try {
    const payload = jwt.decode(token, config.secret);
    if (payload === null || !payload) throw new Error('Invalid token');
    return payload;
  } catch (error) {
    return error;
  }
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

module.exports = {
  validate,
  verifyToken,
  getOffset,
  emptyOrRows,
  errorResponse,
  successResponse,
  generateToken,
  decodeToken,
};
