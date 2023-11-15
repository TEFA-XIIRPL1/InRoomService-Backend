const helper = require('../../src/utils/helper.util');
const { z } = require('zod');
const dummyToken = helper.generateToken({
  id: 1,
  email: 'test@gmail.com',
  name: 'test',
  role: {
    id: 1,
    name: 'Admin',
  },
});

const DummySchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Email is invalid'),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

describe('Helper Utils test', () => {
  describe('getOffset', () => {
    it('Should get the offset without params will return 0', () => {
      expect(helper.getOffset()).toBe(0);
    });
    it('Should get the offset 0 for page 1 with 10 items per page', () => {
      expect(helper.getOffset(10, 1)).toBe(0);
    });
    it('Should get the offset 11 for page 2 with 10 items per page', () => {
      expect(helper.getOffset(10, 2)).toBe(10);
    });
  });

  describe('emptyOrRows', () => {
    it('Should get empty array if rows is empty', () => {
      expect(helper.emptyOrRows()).toEqual([]);
    });
    it('Should get arrary if rows is filled', () => {
      expect(helper.emptyOrRows([1])).toEqual([1]);
    });
  });

  describe('errorResponse', () => {
    it('Should get error response', () => {
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      helper.errorResponse(res, 'error', {}, 500);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'error',
        data: {},
      });
    });
  });

  describe('successResponse', () => {
    it('Should get success response', () => {
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      helper.successResponse(res, 'success', {}, 200);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'success',
        data: {},
      });
    });
  });

  describe('generateToken', () => {
    it('Should get access token and refresh token', () => {
      expect(dummyToken).toHaveProperty('at');
      expect(dummyToken).toHaveProperty('rt');
    });
  });

  describe('verifyToken', () => {
    it('Should get decoded token', () => {
      const atDecoded = helper.verifyToken(dummyToken.at);
      expect(atDecoded).toHaveProperty('id');
      expect(atDecoded).toHaveProperty('email');
      expect(atDecoded).toHaveProperty('name');
      expect(atDecoded).toHaveProperty('role');
    });

    it('Should get error if token is invalid', () => {
      const atDecoded = helper.verifyToken('invalid token');
      expect(atDecoded).toBeInstanceOf(Error);
    });
  });

  describe('validate', () => {
    it('Should get error if validation is invalid', () => {
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      const req = {
        body: {
          email: 'test',
          password: 'test',
        },
      };
      const next = jest.fn();
      helper.validate(DummySchema)(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Email is invalid',
        data: null,
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
