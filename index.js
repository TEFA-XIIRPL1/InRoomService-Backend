const express = require('express');
const path = require('path');

const { configServer } = require('./src/configs/server.config');

// middlewares
const middleware = require('./src/middlewares/auth.middleware');

// routers
const guestRouter = require('./src/routes/guest.route');
const authRouter = require('./src/routes/auth.route');
const servicesRouter = require('./src/routes/services.route');

const app = express();
const port = process.env.PORT || 3000;
const roomRouter = require('./src/routes/room.route');
const productReqRouter = require('./src/routes/productReq.route');

app.use('/public', express.static(path.join(__dirname, 'public')));

configServer(app);

app.get('/', (req, res) => {
  res.status(200).render('<p >Hello World</p>');
});

// route
app.use('/room', roomRouter);
app.use('/auth', authRouter);

app.use(middleware(['Admin']));
app.use('/guest', guestRouter);

app.use('/productReq', productReqRouter);

/* Error handler middleware */
app.use((req, res, err) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});
app.use('/services', servicesRouter);

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`listening at http://localhost:${port}`);
});
