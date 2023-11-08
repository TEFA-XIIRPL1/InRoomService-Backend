const { verifyToken, errorResponse } = require('../utils/helper.util');

const checkToken = (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    errorResponse(res, 'Forbidden refresh token is not found', null, 403);
  }

  const user = verifyToken(refreshToken);
  if (user instanceof Error) {
    errorResponse(res, 'Forbidden refresh token is invalid', null, 403);
  }

  next();
};

const authToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    errorResponse(res, 'Forbidden authorization token is not found', null, 403);
  }

  const accessToken = authorization.split(' ')[1];
  const accessTokenIsValid = verifyToken(accessToken);
  if (accessTokenIsValid instanceof Error) {
    errorResponse(res, 'Unauthorized', null, 401);
  }

  next();
};

module.exports = { checkToken, authToken };
