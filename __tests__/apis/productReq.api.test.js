const request = require('supertest');
const Express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = new Express();

app.use('/productReq', require('../../src/routes/productReq.route'));

const lastId = async () => {
  const productReq = await prisma.productReq.findMany();
  return productReq[productReq.length - 1].id;
};

describe('GET /productReq', () => {
  it('Should get all productReq', async () => {
    const response = await request(app).get('/productReq');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.data).toBeInstanceOf(Array);
  });
});

describe('GET /productReq', () => {
  it('Should get productReq with id 1', async () => {
    const response = await request(app).get('/productReq/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('GET /productReq/status/:status', () => {
  it('Should get productReq with status PENDING', async () => {
    const response = await request(app).get('/productReq/status/PENDING');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('Should get productReq with status ACCEPTED', async () => {
    const response = await request(app).get('/productReq/status/ACCEPTED');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('Should get productReq with status REJECTED', async () => {
    const response = await request(app).get('/productReq/status/REJECTED');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
  });
});

describe('Product Requests by User ID', () => {
  test('Get product requests for a specific user should return a list', async () => {
    const userId = 1;

    const response = await request(app)
      .get(`/productReq/user/${userId}`)

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

});

/* THIS REQUEST NEED CREDENTIALS REQUIREMENT THAT CAN TEST IN UNIT TEST */
// describe('POST /productReq/create', () => {
//   it('Should create a new productReq with picture', async () => {
//     const newProductReq = {
//       title: 'Betadine',
//       userId: 1,
//       typeId: 4,
//       desc: 'Untuk mengobati luka',
//       price: 3000,
//     };

//     const filePath =
//       `${process.env.LOCAL_PATH}/public/assets/images/betadine.jpg`;

//     const response = await request(app)
//       .post('/productReq/create')
//       .field('title', newProductReq.title)
//       .field('userId', newProductReq.userId)
//       .field('typeId', newProductReq.typeId)
//       .field('desc', newProductReq.desc)
//       .field('price', newProductReq.price)
//       .field('serviceTypeId', newProductReq.serviceTypeId)
//       .attach('picture', filePath);

//     expect(response.statusCode).toBe(201);
//     expect(response.body).toHaveProperty('data');
//   });
// });

// describe('PUT /productReq/update/:id', () => {
//   it('Should update an existing productReq', async () => {
//     const updatedProductReq = {
//       title: 'Loreal Shampoo',
//       userId: 1,
//       typeId: 3,
//       desc: 'Membersihkan rambut anda dari kotoran',
//       price: 25000,
//     };

//     const filePath =
//       `${process.env.LOCAL_PATH}/public/assets/images/loreal.jpg`;

//     const response = await request(app)
//       .put(`/productReq/update/3`)
//       .field('title', updatedProductReq.title)
//       .field('userId', updatedProductReq.userId)
//       .field('typeId', updatedProductReq.typeId)
//       .field('desc', updatedProductReq.desc)
//       .field('price', updatedProductReq.price)
//       .field('serviceTypeId', newProductReq.serviceTypeId)
//       .attach('picture', filePath);

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('data');
//   });
// });

// describe('DELETE /productReq/delete', () => {
//   it('Should delete productReq with ID', async () => {
//     const id = await lastId();
//     const response = await request(app).delete(`/productReq/delete/${id}`);
//     expect(response.statusCode).toBe(200);
//   });
// });

describe('POST /productReq/accept/:id', () => {
  it('Should accept an existing productReq', async () => {
    // Mock productReq data with status PENDING
    const mockProductReq = {
      title: 'Betadine Cina',
      userId: 1,
      typeId: 4,
      desc: 'Untuk mengobati luka',
      price: 3000,
      serviceTypeId: 1,
      picture: 'http://localhost:8080/public/assets/images/betadine.jpg',
    };

    // Insert mock data into the database
    const { id } = await prisma.productReq.create({
      data: mockProductReq,
    });

    // Make a request to accept the productReq
    const response = await request(app).post(`/productReq/accept/${id}`);

    // Check the response
    expect(response.statusCode).toBe(200);

    // Check if the statusProductReq is updated to ACCEPTED in the database
    const updatedProductReq = await prisma.productReq.findUnique({
      where: { id },
    });
    expect(updatedProductReq.statusProductReq).toBe('ACCEPTED');

    // Clean up: delete the mock data from the database
    await prisma.productReq.delete({
      where: {
        id,
      },
    });
  });
});

describe('POST /productReq/reject/:id', () => {
  it('Should reject an existing productReq', async () => {
    const filePath = `${process.env.BASE_URL}/public/assets/images/betadine.jpg`;

    // Mock productReq data with status PENDING
    const mockProductReq = {
      title: 'Betadine',
      userId: 1,
      typeId: 4,
      desc: 'Untuk mengobati luka',
      price: 3000,
      serviceTypeId: 1,
      picture: filePath,
    };

    // Insert mock data into the database
    const { id } = await prisma.productReq.create({
      data: mockProductReq,
    });

    // Make a request to reject the productReq
    const response = await request(app).post(`/productReq/reject/${id}`);

    // Check if the statusProductReq is updated to REJECTED in the database
    const updatedProductReq = await prisma.productReq.findUnique({
      where: { id },
    });
    expect(updatedProductReq.statusProductReq).toBe('REJECTED');

    // Clean up: delete the mock data from the database
    await prisma.productReq.delete({
      where: {
        id,
      },
    });

    // Check the response
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});
