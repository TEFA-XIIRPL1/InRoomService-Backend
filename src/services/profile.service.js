const bodyParser = require('body-parser');
const Express = require('express');
const { prisma } = require('../configs/prisma.config');
const { errorResponse, successResponse } = require('../utils/helper.util');

const app = Express();
app.use(bodyParser.json());

async function getAllData(req, res) {
  const data = await prisma.user.findMany();

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
module.exports = {
  getAllData,
  getData,
};
