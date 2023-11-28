const request = require('supertest');
const Express = require('express');
const bodyParser = require('body-parser');

const app = new Express();
app.use(bodyParser.json());
app.use('/room', require('../../src/routes/room.route'));

async function lastId() {
  const response = await request(app).get('/room');
  const { data } = response.body.data;
  console.log(data);
  return data[data.length - 1].id;
}

describe('GET /room', () => {
  it('Should get all room data', async () => {
    const response = await request(app).get('/room');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.data).toBeInstanceOf(Array);
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
  it('Should create a new room with picture', async () => {
    const filePath = `${process.env.LOCAL_PATH}/public/assets/images/kamar.jpeg`;

    const newData = {
      roomType: 'DELUXE',
      roomStatusId: 1,
      roomCapacityId: 1,
      floor: 3,
      occupied_status: true,
      description: 'Kamar Deluxe Single Bed',
      bedSetup: 'SINGLE',
      rate: 240000,
    };

    const response = await request(app)
      .post('/room/create')
      .field('roomType', newData.roomType)
      .attach('roomImage', filePath)
      .field('roomStatusId', newData.roomStatusId)
      .field('roomCapacityId', newData.roomCapacityId)
      .field('floor', newData.floor)
      .field('occupied_status', newData.occupied_status)
      .field('description', newData.description)
      .field('bedSetup', newData.bedSetup)
      .field('rate', newData.rate);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('PUT /room/update/:id', () => {
  it('Should update an existing room with picture', async () => {
    const filePath = `${process.env.LOCAL_PATH}/public/assets/images/kamar.jpeg`;

    const newData = {
      roomType: 'FAMILY',
      roomStatusId: 1,
      roomCapacityId: 1,
      floor: 3,
      occupied_status: true,
      description: 'Kamar Deluxe Twin Bed',
      bedSetup: 'TWIN',
      rate: 240000,
    };

    const id = await lastId();
    console.log(`/room/update/${id}`);
    const response = await request(app)
      .put(`/room/update/${id}`)
      .field('roomType', newData.roomType)
      .attach('roomImage', filePath)
      .field('roomStatusId', newData.roomStatusId)
      .field('roomCapacityId', newData.roomCapacityId)
      .field('floor', newData.floor)
      .field('occupied_status', newData.occupied_status)
      .field('description', newData.description)
      .field('bedSetup', newData.bedSetup)
      .field('rate', newData.rate);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('DELETE /room/delete/:id', () => {
  it('Should delete room with ID', async () => {
    const id = await lastId();
    const response = await request(app).delete(`/room/delete/${id}`);
    expect(response.statusCode).toBe(200);
  });
});
