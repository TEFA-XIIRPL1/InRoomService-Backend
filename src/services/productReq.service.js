const fs = require('fs'); // Tambahkan import fs
const { prisma } = require('../configs/prisma.config');
const { errorResponse, successResponse } = require('../utils/helper.util');

async function create(req, res) {
  try {
    const { title, userId, typeId, desc, price } = req.body;

    if (!title || !userId || !typeId || !desc || !price) {
      return errorResponse(res, 'All required fields must be provided', '', 400);
    }

    const filesaved = req.file ? req.file.filename : '';

    const pictureUrl = `${process.env.BASE_URL}/public/assets/images/${filesaved}`;

    // Simpan data gambar ke database
    const productReq = await prisma.productReq.create({
      data: {
        title,
        userId: parseInt(userId.toString(), 10),
        typeId: parseInt(typeId.toString(), 10),
        desc,
        price: parseInt(price.toString(), 10),
        picture: pictureUrl,
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
    console.error(error);
    errorResponse(res, 'An error occurred while creating the product request', '', 500);
    return Promise.reject(error);
  }
}

// Mendapatkan semua product requests
async function getAll(req, res) {
  try {
    const productReqs = await prisma.productReq.findMany();
    successResponse(res, 'Product requests retrieved successfully', productReqs, 200);
  } catch (error) {
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

// Mengupdate product request
async function update(req, res) {
  const productReqId = parseInt(req.params.id, 10);
  const { title, userId, typeId, desc, price } = req.body;

  try {
    const productReq = await prisma.productReq.findUnique({
      where: {
        id: productReqId,
      },
    });

    if (!productReq) {
      errorResponse(res, 'Product request not found', '', 404);
    } else {
      if (req.file) {
        const newFilesaved = req.file.filename;
        const newPictureUrl = `${process.env.BASE_URL}/public/assets/images/${newFilesaved}`;
        await prisma.productReq.update({
          where: {
            id: productReqId,
          },
          data: {
            title,
            userId: parseInt(userId.toString(), 10),
            typeId: parseInt(typeId.toString(), 10),
            desc,
            price: parseInt(price.toString(), 10),
            picture: newPictureUrl,
          },
        });

        // Hapus file gambar lama
        const oldPictureUrl = productReq.picture;
        const oldFilesaved = oldPictureUrl.split('/').pop();
        const oldPicturePath = `./public/assets/images/${oldFilesaved}`;
        fs.unlinkSync(oldPicturePath);
      } else {
        await prisma.productReq.update({
          where: {
            id: productReqId,
          },
          data: {
            title,
            userId: parseInt(userId.toString(), 10),
            typeId: parseInt(typeId.toString(), 10),
            desc,
            price: parseInt(price.toString(), 10),
          },
        });
      }

      successResponse(
        res,
        `Product request ${productReqId} has been updated successfully`,
        productReq,
        200,
      );
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 'An error occurred while updating the product request', '', 500);
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
      fs.unlinkSync(picturePath);
    }

    await prisma.productReq.delete({
      where: {
        id: productReqId,
      },
    });
    successResponse(res, 'Product request has been deleted successfully', {}, 200);
  } catch (error) {
    console.error(error);
    errorResponse(res, 'An error occurred while deleting the product request', '', 500);
  }
}

module.exports = {
  create,
  getAll,
  getProductReqById,
  update,
  remove,
};
