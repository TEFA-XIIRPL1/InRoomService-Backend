const { prisma } = require('../configs/prisma.config');
const { errorResponse, successResponse } = require('../utils/helper.util');

// Mendapatkan semua subType
async function getSubtypes(req, res) {
  try {
    const subTypes = await prisma.subType.findMany();
    successResponse(res, 'Sub Type retrieved successfully', subTypes, 200);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'An error occurred while fetching Sub Types', '', 500);
  }
}

// menambahkan subType
async function createSubType(req, res) {
  try {
    const { name } = req.body;
    const newSubType = await prisma.subType.create({
      data: {
        name,
      },
    });
    successResponse(res, 'Sub Type created successfully', newSubType, 201);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'An error occurred while creating Sub Type', '', 500);
  }
}

// mengedit subType
async function updateSubType(req, res) {
  const subTypeId = parseInt(req.params.id, 10);

  const { name } = req.body;

  try {
    const subType = await prisma.subType.findUnique({
      where: {
        id: subTypeId,
      },
    });

    if (!subType) {
      return errorResponse(res, 'SubType not found', '', 404);
    }

    await prisma.subType.update({
      where: {
        id: subTypeId,
      },
      data: {
        name,
      },
    });

    successResponse(res, `SubType ${subTypeId} has been updated successfully`, subType, 200);

    return successResponse;
  } catch (error) {
    console.error(error);
    errorResponse(res, 'An error occurred while updating SubType', '', 500);

    return errorResponse;
  }
}

// menghapus subType
async function remove(req, res) {
  const subTypeId = parseInt(req.params.id, 10);
  try {
    const subType = await prisma.subType.delete({
      where: {
        id: subTypeId,
      },
    });
    successResponse(res, 'Sub Type deleted successfully', { subType }, 200);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'An error occurred while deleting Sub Type', '', 500);
  }
}

module.exports = {
  getSubtypes,
  createSubType,
  updateSubType,
  remove,
};
