const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;
const guestRouter = require('./src/routes/guest.route');
const servicesRouter = require('./src/routes/services.route');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (req, res) => {
  res.json({ message: 'putri kecil ayah berjalan dengan benar' });
});

app.use('/guest', guestRouter);
app.use('/services', servicesRouter);

/* Error handler middleware */
app.use((req, res, err) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`listening at http://localhost:${port}`);
});
