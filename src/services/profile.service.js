/* eslint-disable operator-linebreak */
const bodyParser = require('body-parser');
const Express = require('express');
const cookieParser = require('cookie-parser');
const { prisma } = require('../configs/prisma.config');

const { errorResponse, successResponse, verifyToken } = require('../utils/helper.util');

const app = Express();
app.use(cookieParser());
app.use(bodyParser.json());

async function getData(req, res) {
  try {
    const { refreshToken } = req.cookies || {};

    if (!refreshToken) {
      return errorResponse(res, 'Refresh token not found in cookies', '', 400);
    }

    const decoded = verifyToken(refreshToken);

    if (!decoded || !decoded.id) {
      return errorResponse(res, 'Invalid or missing user ID in the token', '', 400);
    }

    const data = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        picture: true,
        phone: true,
        email: true,
        nik: true,
        gender: true,
        birthday: true,
      },
    });

    if (!data) {
      return errorResponse(res, 'User not found', '', 404);
    }

    return successResponse(res, 'User has been retrieved successfully', data, 200);
  } catch (error) {
    console.error('Error in getData:', error);
    return errorResponse(res, 'Internal server error', '', 500);
  }
}

async function updateNumber(req, res) {
  try {
    const { refreshToken } = req.cookies;
    const { phone } = req.body;

    if (!refreshToken) {
      return errorResponse(res, 'Refresh token not found in cookies', '', 400);
    }

    const decoded = verifyToken(refreshToken);

    if (!decoded || !decoded.id) {
      return errorResponse(res, 'Invalid or missing user ID in the token', '', 400);
    }

    const data = await prisma.user.update({
      where: {
        id: decoded.id,
      },
      data: {
        phone,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        nik: true,
        gender: true,
        birthday: true,
      },
    });

    return successResponse(res, 'Phone number updated successfully', data, 200);
  } catch (error) {
    console.error('Error in updateNumber:', error);
    return errorResponse(res, 'Internal server error', '', 500);
  }
}

async function updateEmail(req, res) {
  try {
    const { refreshToken } = req.cookies;
    const { email } = req.body;

    if (!refreshToken) {
      return errorResponse(res, 'Refresh token not found in cookies', '', 400);
    }

    const decoded = verifyToken(refreshToken);

    if (!decoded || !decoded.id) {
      return errorResponse(res, 'Invalid or missing user ID in the token', '', 400);
    }

    const data = await prisma.user.update({
      where: {
        id: decoded.id,
      },
      data: {
        email,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        nik: true,
        gender: true,
        birthday: true,
      },
    });

    return successResponse(res, 'Email updated successfully', data, 200);
  } catch (error) {
    console.error('Error in updateNumber:', error);
    return errorResponse(res, 'Internal server error', '', 500);
  }
}

async function updateNIK(req, res) {
  try {
    const { refreshToken } = req.cookies;
    const { nik } = req.body;

    if (!refreshToken) {
      return errorResponse(res, 'Refresh token not found in cookies', '', 400);
    }

    const decoded = verifyToken(refreshToken);

    if (!decoded || !decoded.id) {
      return errorResponse(res, 'Invalid or missing user ID in the token', '', 400);
    }

    const data = await prisma.user.update({
      where: {
        id: decoded.id,
      },
      data: {
        nik,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        nik: true,
        gender: true,
        birthday: true,
      },
    });

    return successResponse(res, 'NIK updated successfully', data, 200);
  } catch (error) {
    console.error('Error in updateNumber:', error);
    return errorResponse(res, 'Internal server error', '', 500);
  }
}

module.exports = {
  getData,
  updateNumber,
  updateEmail,
  updateNIK,
};
