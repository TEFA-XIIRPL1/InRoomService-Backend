const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
/**
 * @param {import('express').Application} app
 */
const configServer = (app) => {
  app.use(bodyParser.json());
  app.use(cookieParser());
  // const whitelist = ['http://localhost:8080'];
  // const corsOptions = {
  //   origin: (origin, callback) => {
  //     if (whitelist.indexOf(origin) !== -1 || !origin) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  // };

  const origins = 'http://localhost:3000' || [];

  app.use(
    cors({
      origin: origins.split(','),
      credentials: true,
    }),
  );
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
};

module.exports = { configServer };
