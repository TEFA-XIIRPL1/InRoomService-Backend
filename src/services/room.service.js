/* eslint-disable operator-linebreak */
/* eslint-disable camelcase */
const fs = require('fs');
const bodyParser = require('body-parser');
const Express = require('express');
const { prisma } = require('../configs/prisma.config');
const { errorResponse, successResponse } = require('../utils/helper.util');

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
    return errorResponse(res, 'User not found', '', 404);
  }

  return successResponse(res, `Room ${req.params.id} has been getted successfully`, data, 200);
}
async function createData(req, res) {
  try {
    const {
      roomType,
      roomStatusId,
      roomCode,
      roomCapacityId,
      category,
      floor,
      i,
      occupied_status,
      overlook,
      description,
      bedSetup,
      connecting,
      rateCodeId,
    } = req.body;

    const filesaved = req.file ? req.file.filename : '';
    const pictureUrl = `${process.env.BASE_URL}/public/assets/images/${filesaved}`;

    const data = await prisma.room.create({
      data: {
        roomType,
        roomImage: pictureUrl,
        roomStatusId: parseInt(roomStatusId, 10),
        roomCode: parseInt(roomCode, 10),
        roomCapacityId: parseInt(roomCapacityId, 10),
        category,
        floor: parseInt(floor, 10),
        i: parseInt(i, 10),
        occupied_status: occupied_status === 'true',
        overlook,
        description,
        bedSetup,
        connecting,
        rateCodeId: parseInt(rateCodeId, 10),
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
    return errorResponse(res, 'An error occurred while creating the product request', '', 404);
  }
}

async function updateData(req, res) {
  const roomId = parseInt(req.params.id, 10);
  const {
    roomType,
    roomImage,
    roomStatusId,
    roomCode,
    roomCapacityId,
    category,
    floor,
    i,
    occupied_status,
    overlook,
    description,
    bedSetup,
    connecting,
    rateCodeId,
  } = req.body;

  try {
    const data = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!data) {
      errorResponse(res, 'Product request not found', '', 404);
    } else {
      if (req.file) {
        const newFilesaved = req.file.filename;
        const newPictureUrl = `${process.env.BASE_URL}/public/assets/images/${newFilesaved}`;
        await prisma.room.update({
          where: {
            id: roomId,
          },
          data: {
            roomType,
            roomImage: newPictureUrl,
            roomStatusId: parseInt(roomStatusId, 10),
            roomCode: parseInt(roomCode, 10),
            roomCapacityId: parseInt(roomCapacityId, 10),
            category,
            floor: parseInt(floor, 10),
            i: parseInt(i, 10),
            occupied_status: occupied_status === 'true',
            overlook,
            description,
            bedSetup,
            connecting,
            rateCodeId: parseInt(rateCodeId, 10),
          },
        });
        const oldPictureUrl = data.roomImage;
        const oldFilesaved = oldPictureUrl.split('/').pop();
        const oldPicturePath = `./public/assets/images/${oldFilesaved}`;
        fs.unlinkSync(oldPicturePath);
      } else {
        await prisma.room.update({
          where: {
            id: roomId,
          },
          data: {
            roomType,
            roomImage,
            roomStatusId: parseInt(roomStatusId, 10),
            roomCode: parseInt(roomCode, 10),
            roomCapacityId: parseInt(roomCapacityId, 10),
            category,
            floor: parseInt(floor, 10),
            i: parseInt(i, 10),
            occupied_status: occupied_status === 'true',
            overlook,
            description,
            bedSetup,
            connecting,
            rateCodeId: parseInt(rateCodeId, 10),
          },
        });
      }
      successResponse(res, `Product request ${roomId} has been updated successfully`, data, 200);
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 'An error occurred while updating the product request', '', 500);
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
      const pictureUrl = data.roomImage;
      const filesaved = pictureUrl.split('/').pop();
      const picturePath = `./public/assets/images/${filesaved}`;
      fs.unlinkSync(picturePath);
    }

    await prisma.room.delete({
      where: {
        id: roomId,
      },
    });
    successResponse(res, 'Product request has been deleted successfully', {}, 200);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'An error occurred while deleting the product request', '', 500);
  }
}

module.exports = {
  getAllData,
  getData,
  createData,
  updateData,
  deleteData,
};
