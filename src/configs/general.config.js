require('dotenv').config();

const general = {
  listPerPage: 10,
};

module.exports = {
  general,
  secret: process.env.SECRET_KEY,
  port: process.env.PORT,
};
