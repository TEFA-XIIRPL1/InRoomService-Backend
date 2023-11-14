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
  console.log(decoded);
  if (decoded instanceof Error) {
    return errorResponse(res, 'Forbidden authorization token is not valid', null, 403);
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
    return errorResponse(res, 'Forbidden, you are not allowed access this resource', null, 403);
  }
  if (decoded instanceof Error) {
    return errorResponse(res, 'Unauthenticated, you are not logged in', null, 401);
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
