const fs = require('fs');
// const path = require('path');
const { prisma } = require('../configs/prisma.config');
const {
  errorResponse,
  successResponse,
  getFilePath,
  generateAssetUrl,
  deleteAsset,
} = require('../utils/helper.util');

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
    const { name, price, desc, serviceTypeId, subTypeId } = req.body;
    const picture = req.file.filename;
    const pictureUrl = `${process.env.BASE_URL}/uploads/${picture}`;
    const service = await prisma.service.create({
      data: {
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
    return errorResponse(res, 'Create service failed', error.message, 400);
  }
};

const updateService = async (req, res) => {
  const picture = req.file.filename;
  try {
    const { id } = req.params;
    const item = await prisma.service.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (item == null) {
      return errorResponse(res, 'Update service failed', `Service with id ${id} is not found`, 404);
    }
    const oldPicturePath = getFilePath(item.picture);
    const pictureUrl = generateAssetUrl(picture);
    const { name, price, desc, serviceTypeId, subTypeId } = req.body;
    deleteAsset(oldPicturePath);
    const service = await prisma.service.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        price: parseInt(price, 10),
        desc,
        picture: pictureUrl,
        serviceTypeId: parseInt(serviceTypeId, 10),
        subTypeId: parseInt(subTypeId, 10),
        updated_at: new Date(),
      },
    });

    return successResponse(res, 'update service success', service, 200);
  } catch (error) {
    fs.unlinkSync(`./public/assets/images/${picture}`);
    return errorResponse(res, 'update service failed', error.message, 404);
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.service.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (item == null) {
      return errorResponse(res, 'Delete service failed', `Service with id ${id} is not found`, 404);
    }
    const oldPicturePath = getFilePath(item.picture);
    deleteAsset(oldPicturePath);
    await prisma.service.delete({
      where: { id: parseInt(id, 10) },
    });

    return successResponse(res, 'Service yang dipilih telah dihapus', null, 200);
  } catch (error) {
    return errorResponse(res, 'delete service failed', '', 404);
  }
};

module.exports = {
  getService,
  deleteService,
  createService,
  updateService,
  getServiceLatest,
};
