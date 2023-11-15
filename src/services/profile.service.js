const bodyParser = require('body-parser');
const Express = require('express');
const { prisma } = require('../configs/prisma.config');
const { errorResponse, successResponse, verifyToken } = require('../utils/helper.util');

const app = Express();
app.use(bodyParser.json());

async function getData(req, res) {
  const { refreshToken } = req.cookies;

  const decoded = verifyToken(refreshToken);
  const user = await prisma.user.findUnique({
    where: {
      refreshToken,
      userId: decoded.id,
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

  console.log(user);
  if (!user) {
    return errorResponse(res, 'User not found', '', 404);
  }

  return successResponse(res, `User has been getted successfully`, user, 200);
}
module.exports = {
  getData,
};
