const fs = require('fs');
// const path = require('path');
const { prisma } = require('../configs/prisma.config');
const { errorResponse, successResponse } = require('../utils/helper.util');

const getService = async (req, res) => {
  try {
    const { serviceTypeId } = req.params;
    const { id } = req.query;
    const { search } = req.query;
    const { sort } = req.query || 'asc';
    const service = await prisma.service.findMany({
      where: {
        serviceTypeId: parseInt(serviceTypeId, 10),
        ...(id ? { id: parseInt(id, 10) } : {}),
        name: {
          contains: search,
        },
      },
      orderBy: {
        id: sort,
      },
    });

    return successResponse(
      res,
      `Service ${req.params.serviceTypeId} has been getted successfully`,
      service,
      200,
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Service not found', '', 404);
  }
};

const getServiceLatest = async (req, res) => {
  try {
    const { serviceTypeId } = req.params;
    const service = await prisma.service.findMany({
      where: {
        serviceTypeId: parseInt(serviceTypeId, 10),
      },
      orderBy: {
        id: 'desc',
      },
      take: 1,
    });
    successResponse(res, 'get latest service success', service, 200);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'Get latest service failed', '', 404);
  }
};

const createService = async (req, res) => {
  try {
    const { userId, name, price, desc, serviceTypeId, subTypeId } = req.body;
    const picture = req.file.filename;
    const pictureUrl = `${process.env.BASE_URL}/uploads/${picture}`;
    const service = await prisma.service.create({
      data: {
        ...(userId ? { UserId: parseInt(userId, 10) } : { userId: 1 }),
        name,
        price: parseInt(price, 10),
        desc,
        picture: pictureUrl,
        serviceTypeId: parseInt(serviceTypeId, 10),
        subTypeId: parseInt(subTypeId, 10),
        created_at: new Date(),
      },
    });

    return successResponse(res, 'Create service success', service, 200);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Create service failed', '', 404);
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.query;
    const item = await prisma.service.findUnique({
      where: { id: parseInt(id, 10) },
    });
    const oldPictureUrl = item.picture;
    const oldPictureSaved = oldPictureUrl.split('/').pop();
    const oldPicturePath = `./public/assets/images/${oldPictureSaved}`;
    const { userId, name, price, desc, serviceTypeId, subTypeId } = req.body;
    const picture = req.file.filename;
    const pictureUrl = `${process.env.BASE_URL}/public/assets/images/${picture}`;
    try {
      await prisma.service.updateMany({
        where: { id: parseInt(id, 10) },
        data: {
          picture: pictureUrl,
        },
      });
    } catch (error) {
      console.log(error);
    }
    try {
      if (oldPicturePath) {
        fs.unlinkSync(oldPicturePath);
      }
    } catch (error) {
      console.log(error);
    }
    const service = await prisma.service.updateMany({
      where: { id: parseInt(id, 10) },
      data: {
        ...(userId ? { UserId: parseInt(userId, 10) } : { userId: 1 }),
        name,
        price: parseInt(price, 10),
        desc,
        serviceTypeId: parseInt(serviceTypeId, 10),
        subTypeId: parseInt(subTypeId, 10),
        updated_at: new Date(),
      },
    });

    return successResponse(res, 'update service success', service, 200);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 'update service failed', '', 404);
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.query;
    const item = await prisma.service.findUnique({
      where: { id: parseInt(id, 10) },
    });
    const oldPictureUrl = item.picture;
    const oldPictureSaved = oldPictureUrl.split('/').pop();
    const oldPicturePath = `./public/assets/images/${oldPictureSaved}`;
    try {
      if (oldPicturePath) {
        fs.unlinkSync(oldPicturePath);
      }
    } catch (error) {
      console.log(error);
    }
    const service = await prisma.service.delete({
      where: { id: parseInt(id, 10) },
    });

    successResponse(res, 'Service yang dipilih telah dihapus', service, 200);
  } catch (error) {
    console.log(error);
    errorResponse(res, 'delete service failed', '', 404);
  }
};

module.exports = {
  getService,
  deleteService,
  createService,
  updateService,
  getServiceLatest,
};
