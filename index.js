const express = require('express');
const SocketIO = require('socket.io');
const { setupChat } = require('./src/services/chat.service');

const config = require('./src/configs/general.config');

const port = config.port || 3000;
const { configServer } = require('./src/configs/server.config');

// middlewares
const middleware = require('./src/middlewares/auth.middleware');

// routers
const guestRouter = require('./src/routes/guest.route');
const authRouter = require('./src/routes/auth.route');
const servicesRouter = require('./src/routes/services.route');

const app = express();

configServer(app);

app.get('/', (req, res) => {
  res.status(200).render('<p >Hello World</p>');
});

app.use('/auth', authRouter);

app.use(middleware(['Admin']));
app.use('/guest', guestRouter);
app.use('/services', servicesRouter);
app.use();
app.use('/uploads', express.static('uploads'));

const server = app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`listening at http://localhost:${port}`);
});

const io = SocketIO(server);
setupChat(io);
