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
    expect(response.body.data).toBeInstanceOf(Array);
  });
});

describe('GET /room', () => {
  it('Should get guest with id 1', async () => {
    const response = await request(app).get('/room/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

// describe('POST /room/create', () => {
//   it('Should create a new room with picture', async () => {
//     const filePath =
//       'C:/Users/abil/Documents/Projects/Curaweda/InRoomService-Backend/public/assets/images/kamar.jpeg';

//     const newData = {
//       roomType: 'STANDARD',
//       roomStatusId: 1,
//       roomCode: 1,
//       roomCapacityId: 1,
//       category: 'well',
//       floor: 3,
//       i: 2,
//       occupied_status: true,
//       overlook: 'well',
//       description: 'kamar well',
//       bedSetup: 'well',
//       connecting: 'well',
//       rateCodeId: 1,
//     };

//     const response = await request(app)
//       .post('/room/create')
//       .field('roomType', newData.roomType)
//       .attach('roomImage', filePath) // Attach the image here
//       .field('roomStatusId', newData.roomStatusId)
//       .field('roomCode', newData.roomCode)
//       .field('roomCapacityId', newData.roomCapacityId)
//       .field('category', newData.category)
//       .field('floor', newData.floor)
//       .field('i', newData.i)
//       .field('occupied_status', newData.occupied_status)
//       .field('overlook', newData.overlook)
//       .field('description', newData.description)
//       .field('bedSetup', newData.bedSetup)
//       .field('connecting', newData.connecting)
//       .field('rateCodeId', newData.rateCodeId);
//     console.log(response.body);

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('data');
//   });
// });

// describe('PUT /room/update/:id', () => {
//   it('Should update an existing room with picture', async () => {
//     const filePath =
//       'C:/Users/abil/Documents/Projects/Curaweda/InRoomService-Backend/public/assets/images/kamar.jpeg';

//     const newData = {
//       roomType: 'FAMILY',
//       roomStatusId: 1,
//       roomCode: 1,
//       roomCapacityId: 1,
//       category: 'well',
//       floor: 3,
//       i: 2,
//       occupied_status: true,
//       overlook: 'well',
//       description: 'kamar well',
//       bedSetup: 'well',
//       connecting: 'well',
//       rateCodeId: 1,
//     };

//     const id = await lastId();
//     console.log(`/room/update/${id === 1 ? id : id - 1}`);
//     const response = await request(app)
//       .put(`/room/update/${id === 1 ? id : id - 1}`)
//       .field('roomType', newData.roomType)
//       .attach('roomImage', filePath) // Attach the image here
//       .field('roomStatusId', newData.roomStatusId)
//       .field('roomCode', newData.roomCode)
//       .field('roomCapacityId', newData.roomCapacityId)
//       .field('category', newData.category)
//       .field('floor', newData.floor)
//       .field('i', newData.i)
//       .field('occupied_status', newData.occupied_status)
//       .field('overlook', newData.overlook)
//       .field('description', newData.description)
//       .field('bedSetup', newData.bedSetup)
//       .field('connecting', newData.connecting)
//       .field('rateCodeId', newData.rateCodeId);

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('data');
//   });
// });

// describe('DELETE /room/delete/:id', () => {
//   it('Should delete room with ID', async () => {
//     const id = await lastId();
//     const response = await request(app).delete(`/room/delete/${id === 1 ? id : id - 1}`);
//     expect(response.statusCode).toBe(200);
//   });
// });
