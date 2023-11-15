const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const guestRouter = require('./src/routes/guest.route');
const roomRouter = require('./src/routes/room.route');
const profileRouter = require('./src/routes/profile.route');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (req, res) => {
  res.json({ message: 'dedek wawan berjalan dengan benar' });
});

// route
app.use('/room', roomRouter);
app.use('/guest', guestRouter);
app.use('/profile', profileRouter);

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
