const { prisma } = require('../configs/prisma.config');
const { errorResponse, successResponse } = require('../utils/helper.util');
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

async function get(req, res) {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: parseInt(req.params.id, 10),
      },
    });

    return successResponse(res, `User ${req.params.id} has been getted successfully`, user, 200);
  } catch (error) {
    return errorResponse(res, 'User not found', '', 404);
  }
}

module.exports = { get };
