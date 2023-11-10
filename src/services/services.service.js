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

    successResponse(
      res,
      `Service ${req.params.serviceTypeId} has been getted successfully`,
      service,
      200,
    );
  } catch (error) {
    console.error(error);
    errorResponse(res, 'Service not found', '', 404);
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
    const {
      name, price, desc, serviceTypeId,
    } = req.body;
    const picture = req.file.filename;
    const pictureUrl = `${process.env.BASE_URL}/uploads/${picture}`;
    const service = await prisma.service.create({
      data: {
        name,
        price: parseInt(price, 10),
        desc,
        picture: pictureUrl,
        serviceTypeId: parseInt(serviceTypeId, 10),
        created_at: new Date(),
      },
    });

    successResponse(res, 'Create service success', service, 200);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'Create service failed', '', 404);
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.query;
    // const item =
    // const oldImagePath = path.resolve('../../uploads/');
    const {
      name, price, desc, serviceTypeId,
    } = req.body;
    const picture = req.file.filename;
    const pictureUrl = `${process.env.BASE_URL}/uploads/${picture}`;
    const service = await prisma.service.updateMany({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        price: parseInt(price, 10),
        desc,
        picture: pictureUrl,
        serviceTypeId: parseInt(serviceTypeId, 10),
        updated_at: new Date(),
      },
    });

    // if (oldImagePath) {
    //   fs.unlinkSync(oldImagePath);
    // }

    successResponse(res, 'update service success', service, 200);
  } catch (error) {
    errorResponse(res, 'update service failed', '', 404);
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.query;
    const item = await prisma.service.findMany({
      where: { id: parseInt(id, 10) },
    });
    const oldImagePath = item.picture;
    if (oldImagePath) {
      fs.unlinkSync(oldImagePath);
    }
    const service = await prisma.service.delete({
      where: { id: parseInt(id, 10) },
    });

    successResponse(res, 'Service yang dipilih telah dihapus', service, 200);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'Deleting failed', '', 404);
  }
};

module.exports = {
  getService,
  deleteService,
  createService,
  updateService,
  getServiceLatest,
};
