const { PrismaClient } = require('@prisma/client');
const { prisma } = require('../configs/prisma.config');
const {
  errorResponse,
  successResponse,
  verifyToken,
  getAccessToken,
  deleteAsset,
  paginate,
} = require('../utils/helper.util');

const db = new PrismaClient();
async function create(req, res) {
  try {
    const accessToken = getAccessToken(req);

    // Decode the refresh token
    const decoded = verifyToken(accessToken);

    // Retrieve user ID from the decoded token
    const userId = decoded.id;

    const { title, typeId, desc, price, statusProductReq, serviceTypeId } = req.body;

    if (!title || !userId || !typeId || !desc || !price || !serviceTypeId) {
      return errorResponse(res, 'All required fields must be provided', '', 400);
    }

    const filesaved = req.file.filename;

    const pictureUrl = `${process.env.BASE_URL}/public/assets/images/${filesaved}`;

    // Save image data to the database
    const productReq = await db.productReq.create({
      data: {
        title,
        userId: parseInt(userId.toString(), 10),
        typeId: parseInt(typeId.toString(), 10),
        desc,
        price: parseInt(price.toString(), 10),
        picture: pictureUrl,
        statusProductReq,
        serviceTypeId: parseInt(serviceTypeId.toString(), 10),
      },
    });

    successResponse(
      res,
      'Product request has been created successfully',
      { ...productReq, picture: pictureUrl },
      201,
    );

    return Promise.resolve(productReq);
  } catch (error) {
    return errorResponse(res, 'Failed to create product request', error.message, 400);
  }
}

// Mendapatkan semua product requests
async function getAll(req, res) {
  try {
    const { page } = req.query;
    const { perPage } = req.query;
    const { productReq } = prisma;
    const data = await paginate(productReq, {
      page,
      perPage,
    });
    successResponse(res, 'Product requests retrieved successfully', data, 200);
  } catch (error) {
    console.log(error);
    console.error(error);
    errorResponse(res, 'An error occurred while fetching product requests', '', 500);
  }
}

// Mendapatkan product request berdasarkan ID
async function getProductReqById(req, res) {
  const productReqId = parseInt(req.params.id, 10);

  try {
    const productReq = await prisma.productReq.findUnique({
      where: {
        id: productReqId,
      },
    });

    if (productReq) {
      successResponse(
        res,
        `Product request ${productReqId} has been retrieved successfully`,
        productReq,
        200,
      );
    } else {
      errorResponse(res, 'Product request not found', '', 404);
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 'An error occurred while fetching product request data', '', 500);
  }
}

async function getProductReqByUserId(req, res) {
  const userId = parseInt(req.params.userId, 10);

  try {
    // Tambahkan filter where berdasarkan userId pada saat mengambil data productReq
    const productReq = await prisma.productReq.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        picture: true,
        title: true,
        price: true,
        typeId: true,
        desc: true,
        serviceTypeId: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (productReq.length > 0) {
      successResponse(
        res,
        `Product requests for user ${userId} have been retrieved successfully`,
        productReq,
        200,
      );
    } else {
      errorResponse(res, 'Product requests not found for the user', '', 404);
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 'An error occurred while fetching product request data', '', 500);
  }
}

// Mendapatkan product request berdasarkan Status
async function getProductReqByStatus(req, res) {
  const { status } = req.params;

  try {
    const productReq = await prisma.productReq.findMany({
      where: {
        statusProductReq: status,
      },
      select: {
        id: true,
        picture: true,
        title: true,
        price: true,
        typeId: true,
        serviceTypeId: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (productReq.length > 0) {
      successResponse(
        res,
        `Product request with status ${status} has been retrieved successfully`,
        productReq,
        200,
      );
    } else {
      errorResponse(res, 'Product request not found', '', 404);
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 'An error occurred while fetching product request data', '', 500);
  }
}

// Mengupdate product request
async function update(req, res) {
  const productReqId = parseInt(req.params.id, 10);

  const { title, typeId, desc, price, status, serviceTypeId } = req.body;

  try {
    const accessToken = getAccessToken(req);
    // Decode the refresh token
    const decoded = verifyToken(accessToken);

    // Retrieve user ID from the decoded token
    const userId = decoded.id;
    if (!userId) return errorResponse(res, 'Forbiden credentials is invalid', '', 403);

    const productReq = await prisma.productReq.findUnique({
      where: {
        id: productReqId,
      },
    });

    if (!productReq) {
      return errorResponse(res, 'Product request not found', '', 404);
    }

    if (req.file) {
      const newFilesaved = req.file.filename;
      const newPictureUrl = `${process.env.BASE_URL}/public/assets/images/${newFilesaved}`;
      await prisma.productReq.update({
        where: {
          id: productReqId,
        },
        data: {
          title,
          typeId: parseInt(typeId.toString(), 10),
          userId: parseInt(userId.toString(), 10),
          desc,
          price: parseInt(price.toString(), 10),
          status,
          picture: newPictureUrl,
          serviceTypeId: parseInt(serviceTypeId.toString(), 10),
        },
      });

      // Hapus file gambar lama
      const oldPictureUrl = productReq.picture;
      const oldFilesaved = oldPictureUrl.split('/').pop();
      console.log(oldFilesaved);
      const oldPicturePath = `./public/assets/images/${oldFilesaved}`;
      deleteAsset(oldPicturePath);
    } else {
      await prisma.productReq.update({
        where: {
          id: productReqId,
        },
        data: {
          title,
          typeId: parseInt(typeId.toString(), 10),
          desc,
          price: parseInt(price.toString(), 10),
          serviceTypeId: parseInt(serviceTypeId.toString(), 10),
        },
      });
    }

    successResponse(
      res,
      `Product request ${productReqId} has been updated successfully`,
      productReq,
      200,
    );

    // Pastikan untuk mengembalikan respons di sini
    return successResponse;
  } catch (error) {
    console.log(error);
    errorResponse(res, 'An error occurred while updating the product request', '', 500);

    // Pastikan untuk mengembalikan respons di sini
    return errorResponse;
  }
}

// Menghapus product request
async function remove(req, res) {
  const productReqId = parseInt(req.params.id, 10);
  try {
    const productReq = await prisma.productReq.findUnique({
      where: {
        id: productReqId,
      },
    });

    if (productReq) {
      const pictureUrl = productReq.picture;
      const filesaved = pictureUrl.split('/').pop();
      const picturePath = `./public/assets/images/${filesaved}`;
      deleteAsset(picturePath);
    }

    await prisma.productReq.delete({
      where: {
        id: productReqId,
      },
    });
    successResponse(res, 'Product request has been deleted successfully', {}, 200);
  } catch (error) {
    errorResponse(res, 'An error occurred while deleting the product request', '', 500);
  }
}

async function acceptProductReq(req, res) {
  const productReqId = parseInt(req.params.id, 10);

  try {
    const productReq = await prisma.productReq.findUnique({
      where: {
        id: productReqId,
      },
    });

    if (!productReq) {
      return errorResponse(res, 'Product request not found', '', 404);
    }

    if (productReq.statusProductReq === 'ACCEPTED') {
      return errorResponse(res, 'Product request has already been accepted', '', 400);
    }

    if (productReq.statusProductReq === 'REJECTED') {
      return errorResponse(
        res,
        'Product request has been rejected and cannot be accepted',
        '',
        400,
      );
    }

    // Ubah status menjadi ACCEPTED
    await prisma.productReq.update({
      where: {
        id: productReqId,
      },
      data: {
        statusProductReq: 'ACCEPTED',
      },
    });

    // Tambahkan Service baru dengan informasi dari productReq
    const newService = await prisma.service.create({
      data: {
        userId: productReq.userId,
        name: productReq.title,
        price: productReq.price,
        desc: productReq.desc,
        picture: productReq.picture,
        serviceTypeId: productReq.serviceTypeId,
        subTypeId: productReq.typeId,
      },
    });

    successResponse(res, 'Product request accepted successfully', newService, 200);
    return newService;
  } catch (error) {
    console.error(error);
    errorResponse(res, 'An error occurred while accepting the product request', '', 500);
    throw error;
  }
}

async function rejectProductReq(req, res) {
  const productReqId = parseInt(req.params.id, 10);

  try {
    const productReq = await prisma.productReq.findUnique({
      where: {
        id: productReqId,
      },
    });

    if (!productReq) {
      return errorResponse(res, 'Product request not found', '', 404);
    }

    if (productReq.statusProductReq === 'REJECTED') {
      return errorResponse(res, 'Product request has already been rejected', '', 400);
    }

    if (productReq.statusProductReq === 'ACCEPTED') {
      return errorResponse(
        res,
        'Product request has been accepted and cannot be rejected',
        '',
        400,
      );
    }

    // Ubah status menjadi REJECTED
    await prisma.productReq.update({
      where: {
        id: productReqId,
      },
      data: {
        statusProductReq: 'REJECTED',
      },
    });

    successResponse(res, 'Product request rejected successfully', {}, 200);
    return {};
  } catch (error) {
    console.error(error);
    errorResponse(res, 'An error occurred while rejecting the product request', '', 500);
    throw error;
  }
}

module.exports = {
  create,
  getAll,
  getProductReqById,
  getProductReqByStatus,
  update,
  remove,
  acceptProductReq,
  rejectProductReq,
  getProductReqByUserId,
};
