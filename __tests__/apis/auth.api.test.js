const request = require('supertest');
const Express = require('express');
const { configServer } = require('../../src/configs/server.config');

const app = new Express();
configServer(app);
app.use('/auth', require('../../src/routes/auth.route'));

const registerRequest = {
  name: 'Super Admin',
  gender: 'MALE',
  phone: '08123456789',
  picture: 'https://i.pravatar.cc/300',
  email: 'superadmin@gmail.com',
  nik: '1234567890123456',
  birthday: new Date('1990-01-01'),
  username: 'super admin',
  password: 'password',
  roleId: 1,
};
const wrongRegisterRequest = {
  name: 'User',
  gender: 'FEMALE',
  phone: '08123456789',
  picture: 'https://i.pravatar.cc/300',
  email: 'userhoho',
  nik: '12345678901',
  birthday: new Date('1990-01-01'),
  username: 'super admin',
  password: 'password',
  roleId: 1,
};

const registerResponse = {
  success: true,
  message: 'Register success',
  data: {
    name: 'Super Admin',
    email: 'superadmin@gmail.com',
    role: {
      id: 1,
      name: 'Super Admin',
    },
    created_at: new Date().toISOString(),
  },
};

const loginAccountNotExistRequest = {
  email: 'limapuluhsatu@gmail.com',
  password: 'password',
};
const loginRequest = {
  email: 'admindummys@gmail.com',
  password: 'password',
};

describe('POST /auth/register', () => {
  it('Should return error validation', async () => {
    const response = await request(app).post('/auth/register').send(wrongRegisterRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeTruthy();
  });

  /* Note: This can just be tested once because the email should be unique then you will have failed the test at second time */
  // it('Should create the user', async () => {
  //   const response = await request(app)
  //     .post('/auth/register')
  //     .send(registerRequest);

  //   expect(response.statusCode).toBe(201);
  //   expect(response.body).toHaveProperty('data');
  //   expect(response.body.data).toHaveProperty('name', 'Super Admin');
  //   expect(response.body.data).toHaveProperty('email', 'superadmin@gmail.com');
  //   expect(response.body.data.created_at).toBeTruthy();
  //   expect(response.body.role).toEqual(registerRequest.role);
  // });

  it('Should return error because the account already exist', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ ...registerRequest, email: 'admindummys@gmail.com' });

    expect(response.statusCode).toBe(409);
  });
});

describe('POST /auth/login', () => {
  it('Should login return error because the account is not exist', async () => {
    const response = await request(app).post('/auth/login').send(loginAccountNotExistRequest);
    console.log(response.text);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBeTruthy();
  });

  // it('Should login return error because the password is wrong', async () => {
  //   const response = await request(app)
  //     .post('/auth/login')
  //     .send({
  //       ...loginRequest,
  //       password: 'wrong password',
  //     });

  //   expect(response.statusCode).toBe(400);
  //   expect(response.body.message).toBeTruthy();
  // });

  // it('Should login with admin account and get token', async () => {
  //   const response = await request(app).post('/auth/login').send(loginRequest);

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toHaveProperty('data');
  //   expect(response.body.data).toHaveProperty('accessToken');
  //   expect(response.body.data.accessToken).toBeTruthy();
  // });
});

/* Note: If you want this test to get a successful response, you must try it manually because this request must have a refresh token from a secret cookie that can't be gotten from the unit test*/

describe('GET /auth/refresh', () => {
  it('Should return forbidden because the refresh toke is not found', async () => {
    const response = await request(app).get('/auth/refresh');

    expect(response.statusCode).toBe(403);
  });
});

describe('GET /auth/logout', () => {
  it('Should return forbidden because the refresh toke is not found', async () => {
    const response = await request(app).get('/auth/logout');

    expect(response.statusCode).toBe(403);
  });
});
