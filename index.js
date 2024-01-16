const express = require('express');
const cors = require('cors');
const { configServer } = require('./src/configs/server.config');
const middleware = require('./src/middlewares/auth.middleware');
const roomRouter = require('./src/routes/room.route');
const guestRouter = require('./src/routes/guest.route');
const authRouter = require('./src/routes/auth.route');
const servicesRouter = require('./src/routes/services.route');
const productReqRouter = require('./src/routes/productReq.route');
const profileRouter = require('./src/routes/profile.route');
const orderRouter = require('./src/routes/order.route');
const subTypeRouter = require('./src/routes/subType.route');
const config = require('./src/configs/general.config');

const port = config.port || 9000;
const app = express();

// Use cors middleware to handle CORS headers
app.use(cors({
  origin: 'http://localhost:9000',
  credentials: true,
}));

// Handle preflight OPTIONS requests
app.options('*', cors());

configServer(app);

app.get('/', (req, res) => {
  res.status(200).send('<p>Hello World</p>');
});

app.use('/auth', authRouter);
app.use('/order', orderRouter);
app.use(middleware(['Admin', 'Super Admin']));
app.use('/room', roomRouter);
app.use('/guest', guestRouter);
app.use('/productReq', productReqRouter);
app.use('/profile', profileRouter);
app.use('/subType', subTypeRouter);
app.use('/guest', guestRouter);
app.use('/services', servicesRouter);

/* Error handler */
app.use((err, req, res) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening at http://localhost:${port}`);
});
