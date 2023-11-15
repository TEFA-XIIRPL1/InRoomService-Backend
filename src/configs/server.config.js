const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
/**
 * @param {import('express').Application} app
 */
const configServer = (app) => {
  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  // cors
  app.use(
    cors({
      credentials: true,
      origin: ['*', 'http://localhost:3000'],
    }),
  );
};

module.exports = { configServer };
