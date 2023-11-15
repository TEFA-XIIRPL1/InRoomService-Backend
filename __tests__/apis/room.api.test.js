const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const app = new express();
app.use(bodyParser.json());
app.use('/room', require('../../src/routes/room.route'));
async function lastId() {
  const response = await request(app).get('/room');
  const { data } = response.body;
  console.log(data);
  return data[data.length - 1].id;
}

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
    const id = await lastId();
    console.log(`/room/update/${id === 1 ? id : id - 1}`);
    const response = await request(app)
      .put(`/room/update/${id === 1 ? id : id - 1}`)
      .send(newData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('DELETE /room/delete/:id', () => {
  it('Should delete room with ID', async () => {
    const id = await lastId();
    const response = await request(app).delete(`/room/delete/${id === 1 ? id : id - 1}`);
    expect(response.statusCode).toBe(200);
  });
});
