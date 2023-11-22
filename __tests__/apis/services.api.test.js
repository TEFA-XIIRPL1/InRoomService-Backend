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
    const response = await request(app).get('/services/1/?id=15');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('Post /services/create-service', () => {
  it('Should post a new service', async () => {
    const newService = {
      userId: 5,
      name: 'slapur',
      price: 20000,
      desc: 'Pak Slapur pengen dijual',
      serviceTypeId: 1,
      subTypeId: 4,
    };

    const imagePath = `${process.env.LOCAL_PATH}/public/assets/images/contoh_gambar.jpg`;

    const response = await request(app)
      .post('/services/create-service')
      .field('name', newService.name)
      .field('price', newService.price)
      .field('desc', newService.desc)
      .field('serviceTypeId', newService.serviceTypeId)
      .field('subTypeId', newService.subTypeId)
      .attach('picture', imagePath);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('Put /services/update/', () => {
  it('Should put an update to a service with latest id', async () => {
    const latestServiceResponse = await request(app).get('/services/1/latest');
    const id = latestServiceResponse.body.data[0].id;
    console.log(id);
    const updateService = {
      userId: 1,
      name: 'slapur',
      price: 20000,
      desc: 'Pak Slapur pengen dijual',
      serviceTypeId: 1,
      subTypeId: 1,
    };

    const imagePath = `${process.env.LOCAL_PATH}/public/assets/images/contoh_gambar2.jpg`;

    const response = await request(app)
      .put(`/services/update/?id=${id}`)
      .field('name', updateService.name)
      .field('price', updateService.price)
      .field('desc', updateService.desc)
      .field('serviceTypeId', updateService.serviceTypeId)
      .field('subTypeId', updateService.subTypeId)
      .attach('picture', imagePath);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('Delete /services/delete', () => {
  it('Should delete a service with the newest id', async () => {
    const latestServiceResponse = await request(app).get('/services/1/latest');
    const id = latestServiceResponse.body.data[0].id;
    const response = await request(app).delete(`/services/delete/?id=${id}`);
  });
});
