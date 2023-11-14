const bcrypt = require('bcrypt');
const { Prisma } = require('@prisma/client');
const { prisma } = require('../configs/prisma.config');
const {
  errorResponse,
  successResponse,
  generateToken,
  verifyToken,
} = require('../utils/helper.util');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

async function register(req, res) {
  try {
    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
      },
      select: {
        name: true,
        email: true,
        created_at: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return successResponse(res, 'Register success', user, 201);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return errorResponse(res, 'Account already exists', null, 409);
      }
      return errorResponse(res, 'Invalid request', error, 400);
    }
    return errorResponse(res, 'Internal server error', error.message, 500);
  }
}

async function login(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (user === null) {
      throw new Error('Account not found');
    }

    const password = bcrypt.compareSync(req.body.password, user.password);
    if (!password) {
      throw new Error('Email or Password wrong');
    }

    delete user.password;
    const { at, rt } = generateToken(user);
    await prisma.userToken.create({
      data: {
        userId: user.id,
        refreshToken: rt,
        expired_at: new Date(Date.now() + 60 * 15 * 1000),
      },
    });
    res.cookie('refreshToken', rt, {
      httponly: true,
    });
    return successResponse(res, 'Login success', { accessToken: at });
  } catch (error) {
    if (error.message === 'Email or Password wrong') {
      return errorResponse(res, error.message, null, 400);
    }

    if (error.message === 'Account not found') {
      return errorResponse(res, error.message, null, 404);
    }

    return errorResponse(res, error.message, null, 500);
  }
}

async function refresh(req, res) {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new Error('Forbidden refresh token is not found');
    }

    const user = verifyToken(refreshToken);
    await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
    });

    await prisma.userToken.delete({
      where: {
        refreshToken,
        userId: user.id,
      },
    });

    res.clearCookie('refreshToken');

    const { at, rt } = generateToken(user);

    await prisma.userToken.create({
      data: {
        userId: user.id,
        refreshToken: rt,
        expired_at: new Date(Date.now() + 60 * 15 * 1000),
      },
    });

    res.cookie('refreshToken', rt, {
      httponly: true,
    });

    return successResponse(res, 'Refresh token success', { accessToken: at });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return errorResponse(res, 'Refresh token invalid or not found', null, 404);
      }
      return errorResponse(res, 'Invalid request', error, 400);
    }
    return errorResponse(res, error.message, null, 403);
  }
}

async function logout(req, res) {
  try {
    const { refreshToken } = req.cookies;

    const decoded = verifyToken(refreshToken);
    await prisma.userToken.delete({
      where: {
        refreshToken,
        userId: decoded.id,
      },
    });

    res.clearCookie('refreshToken');
    return successResponse(res, 'Logout success', null, 200);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return errorResponse(res, 'Refresh token invalid or not found', null, 404);
      }
      return errorResponse(res, 'Bad request', error, 400);
    }
    return errorResponse(res, error.message, null, 403);
  }
}

module.exports = {
  register,
  login,
  refresh,
  logout,
};
