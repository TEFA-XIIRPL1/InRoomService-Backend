const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const configServer = (app) => {
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
};

module.exports = { configServer };
