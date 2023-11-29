const request = require('supertest');
const Express = require('express');
const { configServer } = require('../../src/configs/server.config');
const { prisma } = require('../../src/configs/prisma.config');

const app = new Express();
configServer(app);

app.use('/subType', require('../../src/routes/subType.route'));

const lastId = async () => {
  const subType = await prisma.subType.findMany();
  return subType[subType.length - 1].id;
}

describe('GET /subType/', () => {
    it('Should get all subTypes', async () => {
        const response = await request(app).get('/subType/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
});

describe('POST /subType/create', () => {
  it('Should create a new subType', async () => {
    const subTypeData = { name: 'SNACK' };

    const response = await request(app)
      .post('/subType/create')
      .send(subTypeData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.name).toBe(subTypeData.name);
  });
});

describe('PUT /subType/update/:id', () => {
  it('Should update a last subTyoe', async () => {
    const id = await lastId();
    const updateSubType = {
      name: 'MILK',
    };

    const response = await request(app)
      .put(`/subType/update/${id}`)
      .send(updateSubType);
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  })
})

describe('DELETE /subType/delete', () => {
  it('Should delete subType with ID', async () => {
    const id = await lastId();
    const response = await request(app).delete(`/subType/delete/${id}`);
    expect(response.statusCode).toBe(200);
  });
});