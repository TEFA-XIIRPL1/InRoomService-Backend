// const request = require('supertest');
// const express = require('express');
// const bodyParser = require('body-parser');
// const { describe } = require('test');

// const app = express();
// app.use(bodyParser.json());
// app.use('/auth', require('../../src/routes/auth.route'));
// app.use('/profile', require('../../src/routes/profile.route'));

// const loginRequest = {
//   email: 'admindummys@gmail.com',
//   password: 'password',
// };

// describe('GET /profile', () => {
//   it('Should get profile with token', async () => {
//     let authToken;

//     const loginResponse = await request(app).post('/auth/login').send(loginRequest);
//     console.log(loginResponse.body);

//     authToken = loginResponse.body.data.accessToken;

//     const response = await request(app)
//       .get('/profile')
//       .set('Authorization', `Bearer ${authToken}`)
//       .set('Cookie', [`refreshToken = ${authToken}`]);

//     console.log('response', response.body);

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('data');
//     expect(response.body.data).toHaveProperty('accessToken');
//     expect(response.body.data.accessToken).toBeTruthy();
//   });
// });

// describe('PUT /profile/updateNumber', () => {
//   it('Should update number with token', async () => {
//     let authToken;

//     const loginResponse = await request(app).post('/auth/login').send(loginRequest);
//     console.log(loginResponse.body);

//     authToken = loginResponse.body.data.accessToken;

//     const newPhoneNumber = '08234567890';

//     const newData = {
//       id: true,
//       name: true,
//       phone: newPhoneNumber,
//       email: true,
//       nik: true,
//       gender: true,
//       birthday: true,
//     };
//     const response = await request(app)
//       .put('/profile/updateNumber')
//       .set('Authorization', `Bearer ${authToken}`)
//       .set('Cookie', [`refreshToken = ${authToken}`])
//       .send(newData);

//     console.log('response', response.body);

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('data');
//     expect(response.body.data).toHaveProperty('accessToken');
//     expect(response.body.data.accessToken).toBeTruthy();
//   });
// });

// describe('PUT /profile/updateNumber', () => {
//   it('Should update number with token', async () => {
//     let authToken;

//     const loginResponse = await request(app).post('/auth/login').send(loginRequest);
//     console.log(loginResponse.body);

//     authToken = loginResponse.body.data.accessToken;

//     const newEmail = 'newdummyemail@gmail.com';

//     const newData = {
//       id: true,
//       name: true,
//       phone: true,
//       email: newEmail,
//       nik: true,
//       gender: true,
//       birthday: true,
//     };
//     const response = await request(app)
//       .put('/profile/updateNumber')
//       .set('Authorization', `Bearer ${authToken}`)
//       .set('Cookie', [`refreshToken = ${authToken}`])
//       .send(newData);

//     console.log('response', response.body);

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('data');
//     expect(response.body.data).toHaveProperty('accessToken');
//     expect(response.body.data.accessToken).toBeTruthy();
//   });
// });

// describe('PUT /profile/updateNumber', () => {
//   it('Should update number with token', async () => {
//     let authToken;

//     const loginResponse = await request(app).post('/auth/login').send(loginRequest);
//     console.log(loginResponse.body);

//     authToken = loginResponse.body.data.accessToken;

//     const newNIK = '0320983081038132';

//     const newData = {
//       id: true,
//       name: true,
//       phone: true,
//       email: true,
//       nik: newNIK,
//       gender: true,
//       birthday: true,
//     };
//     const response = await request(app)
//       .put('/profile/updateNumber')
//       .set('Authorization', `Bearer ${authToken}`)
//       .set('Cookie', [`refreshToken = ${authToken}`])
//       .send(newData);

//     console.log('response', response.body);

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('data');
//     expect(response.body.data).toHaveProperty('accessToken');
//     expect(response.body.data.accessToken).toBeTruthy();
//   });
// });
