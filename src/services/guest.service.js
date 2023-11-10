const { prisma } = require('../configs/prisma.config');
const { errorResponse, successResponse } = require('../utils/helper.util');
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

async function get(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id, 10),
    },
  });

  if (!user) {
    return errorResponse(res, 'User not found', '', 404);
  }

  return successResponse(
    res,
    `User ${req.params.id} has been getted successfully`,
    user,
    200,
  );
}

module.exports = { get };
