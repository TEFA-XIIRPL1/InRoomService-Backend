const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const app = new express();
app.use(bodyParser.json());

app.use('/room', require('../../src/routes/room.route'));

describe('GET /room', () => {
  it('Should get all room data', async () => {
    const response = await request(app).get('/room');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('GET /room', () => {
  it('Should get guest with id 1', async () => {
    const response = await request(app).get('/room/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('POST /room/create', () => {
  it('Should create a new room', async () => {
    const newData = {
      roomType: 'FAMILY',
      roomImage: 'https://i.pravatar.cc/300',
      roomStatusId: 1,
      roomCode: 1,
      roomCapacityId: 1,
      category: 'well',
      floor: 3,
      i: 2,
      occupied_status: true,
      overlook: 'well',
      description: 'kamar well',
      bedSetup: 'well',
      connecting: 'well',
      rateCodeId: 1,
    };
    // console.log(newData);

    const response = await request(app).post('/room/create').send(newData);

    // Perform assertions
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('PUT /room/update/:id', () => {
  it('Should update an existing room', async () => {
    const newData = {
      roomType: 'DELUXE',
      roomImage: 'Foto Luqman Ngetest API',
      roomStatusId: 1,
      roomCode: 1,
      roomCapacityId: 1,
      category: 'well',
      floor: 3,
      i: 2,
      occupied_status: true,
      overlook: 'well',
      description: 'kamar well',
      bedSetup: 'well',
      connecting: 'well',
      rateCodeId: 1,
    };

    const response = await request(app).put('/room/update/1').send(newData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('PUT /room/patch/:id', () => {
  it('Should patch an existing room', async () => {
    const newData = {
      roomType: 'DELUXE',
      roomImage: 'Foto Luqman Ngetest API',
      roomStatusId: 1,
      roomCode: 1,
      roomCapacityId: 1,
      category: 'well',
      floor: 3,
      i: 2,
      occupied_status: true,
      overlook: 'well',
      description: 'kamar well',
      bedSetup: 'well',
      connecting: 'well',
      rateCodeId: 1,
    };

    const response = await request(app).patch('/room/patch/2').send(newData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('DELETE /room/delete/:id', () => {
  it('Should delete room with ID', async () => {
    const response = await request(app).delete('/room/delete/38');
    expect(response.statusCode).toBe(200);
  });
});
