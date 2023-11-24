/* eslint-disable operator-linebreak */
/* eslint-disable camelcase */
const bodyParser = require('body-parser');
const Express = require('express');
const { prisma } = require('../configs/prisma.config');
const {
  errorResponse,
  successResponse,
  deleteAsset,
  getFilePath,
  generateAssetUrl,
} = require('../utils/helper.util');

const app = Express();
app.use(bodyParser.json());

async function getAllData(req, res) {
  const data = await prisma.room.findMany();

  if (!data) {
    return errorResponse(res, 'User not found', '', 404);
  }

  return successResponse(res, `Room has been getted successfully`, data, 200);
}

async function getData(req, res) {
  const data = await prisma.room.findUnique({
    where: {
      id: parseInt(req.params.id, 10),
    },
  });

  if (!data) {
    return errorResponse(res, 'Room not found', '', 404);
  }

  return successResponse(res, `Room ${req.params.id} has been getted successfully`, data, 200);
}

async function createData(req, res) {
  try {
    const {
      roomType,
      roomStatusId,
      roomCapacityId,
      floor,
      bedSetup,
      description,
      occupied_status,
      rate,
    } = req.body;

    const filesaved = req.file ? req.file.filename : '';
    const pictureUrl = `${process.env.BASE_URL}/public/assets/images/${filesaved}`;

    const data = await prisma.room.create({
      data: {
        roomType,
        roomImage: pictureUrl,
        roomStatusId: parseInt(roomStatusId, 10),
        roomCapacityId: parseInt(roomCapacityId, 10),
        floor: parseInt(floor, 10),
        bedSetup,
        description,
        occupied_status: occupied_status === 'true',
        rate: parseInt(rate, 10),
      },
    });

    return successResponse(
      res,
      `Data has been inserted successfully`,
      { ...data, roomImage: pictureUrl },
      200,
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, 'An error occurred while creating the Room', '', 404);
  }
}

async function updateData(req, res) {
  const roomId = parseInt(req.params.id, 10);
  const {
    roomType,
    roomStatusId,
    roomCapacityId,
    floor,
    bedSetup,
    description,
    occupied_status,
    rate,
  } = req.body;

  const picture = req.file ?? null;
  const pictureUrl = picture !== null ? generateAssetUrl(picture) : null;
  try {
    const data = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });

    if (data === null) {
      return errorResponse(res, 'Room not found', '', 404);
    }
    const oldPicturePath = getFilePath(data.roomImage);
    const response = await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        roomType,
        roomImage: pictureUrl !== null ? pictureUrl : data.roomImage,
        roomStatusId: parseInt(roomStatusId, 10),
        roomCapacityId: parseInt(roomCapacityId, 10),
        floor: parseInt(floor, 10),
        bedSetup,
        description,
        occupied_status: occupied_status === 'true',
        rate: parseInt(rate, 10),
      },
    });
    if (picture !== null) {
      deleteAsset(oldPicturePath);
    }
    return successResponse(res, `Room ${roomId} has been updated successfully`, response, 200);
  } catch (error) {
    return errorResponse(res, 'An error occurred while updating the Room', '', 500);
  }
}

async function deleteData(req, res) {
  const roomId = parseInt(req.params.id, 10);

  try {
    const data = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!data) {
      const oldPicturePath = getFilePath(data.roomImage);
      deleteAsset(oldPicturePath);
    }

    await prisma.room.delete({
      where: {
        id: roomId,
      },
    });
    successResponse(res, 'Room has been deleted successfully', {}, 200);
  } catch (error) {
    errorResponse(res, 'An error occurred while deleting the Room', '', 500);
  }
}

module.exports = {
  getAllData,
  getData,
  createData,
  updateData,
  deleteData,
};
