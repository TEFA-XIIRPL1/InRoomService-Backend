// dependencies / libraries
const express = require('express');
const { configServer } = require('./src/configs/server.config');

// middlewares
const middleware = require('./src/middlewares/auth.middleware');

// routers
const roomRouter = require('./src/routes/room.route');
const guestRouter = require('./src/routes/guest.route');
const authRouter = require('./src/routes/auth.route');
const servicesRouter = require('./src/routes/services.route');
const productReqRouter = require('./src/routes/productReq.route');
const profileRouter = require('./src/routes/profile.route');
const orderRouter = require('./src/routes/order.route');

// configs
const config = require('./src/configs/general.config');

const port = config.port || 3000;
const app = express();
configServer(app);

// endpoint
app.get('/', (req, res) => {
  res.status(200).render('<p >Hello World</p>');
});
app.use('/auth', authRouter);
app.use('/order', orderRouter);
app.use(middleware(['Admin', 'Super Admin']));
app.use('/room', roomRouter);
app.use('/guest', guestRouter);
app.use('/productReq', productReqRouter);
app.use('/profile', profileRouter);
app.use('/services', servicesRouter);

/* Error handler */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err);
});

// logger
app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`listening at http://localhost:${port}`);
});
