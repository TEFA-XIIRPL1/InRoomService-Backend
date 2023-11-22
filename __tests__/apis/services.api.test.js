const request = require('supertest');
const Express = require('express');

const app = new Express();

app.use('/services', require('../../src/routes/services.route'));

describe('GET /services/', () => {
  it('Should get services with serviceType 1 (Mini market)', async () => {
    const response = await request(app).get('/services/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
  it('Should get service with Id 1', async () => {
    const response = await request(app).get('/services/1/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

// describe('Post /services/create-service', () => {
//   it('Should post a new service', async () => {
//     const response = await request(app).get('/services/create-service');
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('data');
//   });
// });
