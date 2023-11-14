/* eslint-disable camelcase */
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

  return successResponse(
    res,
    `Room ${req.params.id} has been getted successfully`,
    data,
    200,
  );
}
async function createData(req, res) {
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
  const data = await prisma.room.create({
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

  if (!data) {
    return errorResponse(res, 'Error', '', 404);
  }

  return successResponse(res, `Data has been inserted successfully`, data, 200);
}

async function updateData(req, res) {
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

  const data = await prisma.room.update({
    where: {
      id: parseInt(req.params.id, 10),
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
      // eslint-disable-next-line camelcase
      occupied_status: occupied_status === 'true',
      overlook,
      description,
      bedSetup,
      connecting,
      rateCodeId: parseInt(rateCodeId, 10),
    },
  });

  if (!data) {
    return errorResponse(res, 'Error', '', 404);
  }

  return successResponse(res, `Data has been updated successfully`, data, 200);
}

async function patchData(req, res) {
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

  const data = await prisma.room.update({
    where: {
      id: parseInt(req.params.id, 10),
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

  if (!data) {
    return errorResponse(res, 'Error', '', 404);
  }

  return successResponse(res, `Data has been patched successfully`, data, 200);
}

async function deleteData(req, res) {
  const data = await prisma.room.delete({
    where: {
      id: parseInt(req.params.id, 10),
    },
  });

  if (!data) {
    return errorResponse(res, 'Error', '', 404);
  }

  return successResponse(res, `Data has been Deleted Successfully`, data, 200);
}

module.exports = {
  getAllData,
  getData,
  createData,
  updateData,
  patchData,
  deleteData,
};
