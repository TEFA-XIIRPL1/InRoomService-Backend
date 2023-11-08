const express = require('express');

const config = require('./src/configs/general.config');

const port = config.port || 3000;
const guestRouter = require('./src/routes/guest.route');
const authRouter = require('./src/routes/auth.route');
const { configServer } = require('./src/configs/server.config');

const app = express();

configServer(app);

app.get('/', (req, res) => {
  res.json({ message: 'dedek wawan berjalan dengan benar' });
});

app.use('/guest', guestRouter);
app.use('/auth', authRouter);

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
