const { JsonWebTokenError } = require('jsonwebtoken');
const { prisma } = require('../configs/prisma.config');
const { verifyToken, errorResponse } = require('../utils/helper.util');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

const auth = (roles) => async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return errorResponse(res, 'Forbidden, refresh token is not found', null, 403);
  }

  const { authorization } = req.headers;
  if (!authorization) {
    return errorResponse(res, 'Forbidden authorization token is not found', null, 403);
  }

  const accessToken = authorization.split(' ')[1];
  const decoded = verifyToken(accessToken);
  if (decoded instanceof JsonWebTokenError) {
    return errorResponse(res, 'Unauthorized, invalid access token', null, 401);
  }
  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
    select: {
      role: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!user) {
    return errorResponse(res, 'Forbidden, user not found', null, 403);
  }

  if (roles !== undefined) {
    const isAllowed = roles.some((role) => role === user.role.name);
    if (!isAllowed) {
      return errorResponse(res, 'Forbidden, you are not allowed access this resource', null, 403);
    }
  }

  return next();
};

module.exports = auth;
