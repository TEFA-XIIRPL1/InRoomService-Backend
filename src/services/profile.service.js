/* eslint-disable operator-linebreak */
const bodyParser = require('body-parser');
const Express = require('express');
const cookieParser = require('cookie-parser');
const { prisma } = require('../configs/prisma.config');
const {
  errorResponse,
  successResponse,
  verifyToken,
  getAccessToken,
  deleteAsset,
} = require('../utils/helper.util');

const app = Express();
app.use(cookieParser());
app.use(bodyParser.json());

async function getData(req, res) {
  try {
    const accessToken = getAccessToken(req);

    const decoded = verifyToken(accessToken);
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

async function updateImage(req, res) {
  try {
    const accessToken = getAccessToken(req);
    const decoded = verifyToken(accessToken);
    const newFilesaved = req.file.filename;
    const newPictureUrl = `${process.env.BASE_URL}/public/assets/images/${newFilesaved}`;

    const data = await prisma.user.update({
      where: {
        id: decoded.id,
      },
      data: {
        picture: newPictureUrl,
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

    const oldPictureUrl = data.picture;
    const oldFilesaved = oldPictureUrl.split('/').pop();
    console.log(oldFilesaved);
    const oldPicturePath = `./public/assets/images/${oldFilesaved}`;
    deleteAsset(oldPicturePath);

    return successResponse(res, 'Picture updated successfully', data, 200);
  } catch (error) {
    console.error('Error in updateNumber:', error);
    return errorResponse(res, 'Internal server error', '', 500);
  }
}

async function updateNumber(req, res) {
  try {
    const { phone } = req.body;
    const accessToken = getAccessToken(req);
    const decoded = verifyToken(accessToken);
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
        picture: true,
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
    const { email } = req.body;
    const accessToken = getAccessToken(req);
    const decoded = verifyToken(accessToken);
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
        picture: true,
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
    const { nik } = req.body;
    const accessToken = getAccessToken(req);
    const decoded = verifyToken(accessToken);
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
        picture: true,
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
  updateImage,
  updateNumber,
  updateEmail,
  updateNIK,
};
