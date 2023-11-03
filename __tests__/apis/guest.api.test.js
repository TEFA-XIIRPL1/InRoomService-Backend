const request = require('supertest');
const Express = require('express');

const app = new Express();

app.use('/guest', require('../../src/routes/guest.route'));

describe('GET /guests', () => {
  it('Should get  guest with id 1', async () => {
    const response = await request(app).get('/guest/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});
