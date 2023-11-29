/* eslint-disable operator-linebreak */
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

const { PrismaClientKnownRequestError } = require('@prisma/client/runtime/library');
const { prisma } = require('../configs/prisma.config');
const {
  successResponse,
  verifyToken,
  generateSubtotal,
  generateTotal,
  getAccessToken,
  generateItemPrice,
  errorResponse,
} = require('../utils/helper.util');
const { prismaError } = require('../utils/errors.util');

/**
 *
 * @param {import ('express').Request} req
 * @param {import ('express').Response} res
 */
async function create(req, res) {
  try {
    const accessToken = getAccessToken(req);
    const decoded = verifyToken(accessToken);
    const subtotal = await generateSubtotal(req.body.items);
    const order = await prisma.order.create({
      data: {
        guestId: decoded.id,
        roomId: decoded.roomId ?? 1, // 1 for temporary roomId because we don't have roomId yet in the payload
        subtotal,
        ppn: subtotal * 0.1,
        fees: 1000,
        total: generateTotal(subtotal),
        orderDetails: {
          createMany: {
            data: await Promise.all(
              req.body.items.map(async (item) => ({
                serviceId: parseInt(item.serviceId, 10),
                price: await generateItemPrice(item.serviceId, item.qty),
                qty: parseInt(item.qty, 10),
              })),
            ),
          },
        },
      },
      include: {
        orderDetails: {
          include: {
            service: true,
          },
        },
      },
    });

    return successResponse(res, 'Order created successfully', order, 201);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return prismaError(error, error.message, res);
    }
    return errorResponse(res, 'Internal server error', error.message, 500);
  }
}

/**
 *
 * @param {import ('express').Request} req
 * @param {import ('express').Response} res
 */
async function updateQty(req, res) {
  try {
    const { id, dordId } = req.params;
    const { serviceId, qty } = req.body;
    const newPrice = await generateItemPrice(serviceId, parseInt(qty, 10));

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        orderDetails: {
          select: {
            id: true,
            serviceId: true,
            qty: true,
          },
        },
      },
    });
    if (!order) {
      return errorResponse(res, 'Order not found', 'Order not found', 404);
    }
    const orderDetailToUpdate = order.orderDetails.find(
      (orderDetail) =>
        orderDetail.id === parseInt(dordId, 10) &&
        orderDetail.serviceId === parseInt(serviceId, 10),
    );
    if (!orderDetailToUpdate) {
      return errorResponse(res, 'Order detail not found', 'Order detail not found', 404);
    }

    let updatedOrderDetails;

    if (parseInt(qty, 10) === 0) {
      await prisma.orderDetail.delete({
        where: {
          id: parseInt(dordId, 10),
        },
      });

      updatedOrderDetails = order.orderDetails.filter(
        (orderDetail) => orderDetail.id !== parseInt(dordId, 10),
      );
    } else {
      const updatedOrderDetail = await prisma.orderDetail.update({
        where: {
          id: parseInt(dordId, 10),
        },
        data: {
          price: newPrice,
          qty: parseInt(qty, 10),
        },
        select: {
          serviceId: true,
          qty: true,
        },
      });

      /**
       *
       * @constant { {serviceId:number, qty:number}[] } updatedOrderDetails
       */
      updatedOrderDetails = order.orderDetails.map((orderDetail) => {
        if (
          orderDetail.serviceId === orderDetailToUpdate.serviceId &&
          orderDetail.id === parseInt(dordId, 10)
        ) {
          return updatedOrderDetail;
        }
        return orderDetail;
      });
    }

    if (updatedOrderDetails.length === 0) {
      await prisma.order.delete({
        where: {
          id,
        },
      });
      return successResponse(res, 'Order deleted successfully because no item found', null, 200);
    }

    const newSubtotal = await generateSubtotal(updatedOrderDetails);

    const updatedOrder = await prisma.order.update({
      where: {
        id,
      },
      data: {
        subtotal: newSubtotal,
        ppn: newSubtotal * 0.1,
        total: generateTotal(newSubtotal),
      },
      include: {
        orderDetails: {
          include: {
            service: true,
          },
        },
      },
    });

    return successResponse(res, 'Order updated successfully', updatedOrder, 200);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return prismaError(error, error.meta?.cause, res);
    }
    return errorResponse(res, 'Internal server error', error.message, 500);
  }
}

/**
 *
 * @param {import ('express').Request} req
 * @param {import ('express').Response} res
 */
async function updateNewItem(req, res) {
  try {
    const { id } = req.params;
    const oldOrder = await prisma.order.findUnique({
      where: {
        id,
      },
      select: {
        subtotal: true,
      },
    });
    const subtotal = await generateSubtotal(req.body.items);
    const newSubtotal = oldOrder.subtotal + subtotal;
    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        subtotal: newSubtotal,
        ppn: newSubtotal * 0.1,
        total: generateTotal(newSubtotal),
        orderDetails: {
          createMany: {
            data: await Promise.all(
              req.body.items.map(async (item) => ({
                serviceId: parseInt(item.serviceId, 10),
                price: await generateItemPrice(item.serviceId, item.qty),
                qty: parseInt(item.qty, 10),
              })),
            ),
          },
        },
      },
      include: {
        orderDetails: {
          include: {
            service: true,
          },
        },
      },
    });

    return successResponse(res, 'New item added successfully', order, 201);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return prismaError(error, error.meta?.cause, res);
    }
    return errorResponse(res, 'Internal server error', error.message, 500);
  }
}

/**
 *
 * @param {import ('express').Request} req
 * @param {import ('express').Response} res
 */
async function remove(req, res) {
  try {
    const { id } = req.params;
    await prisma.orderDetail.deleteMany({
      where: {
        orderId: id,
      },
    });

    await prisma.order.delete({
      where: {
        id,
      },
    });

    return successResponse(res, 'Order deleted successfully', null, 200);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return prismaError(error, error.meta?.cause, res);
    }
    return errorResponse(res, 'Internal server error', error.message, 500);
  }
}

module.exports = {
  create,
  updateQty,
  updateNewItem,
  remove,
};
