require('dotenv').config();

const general = {
  listPerPage: 10,
};

module.exports = {
  general,
  secret: process.env.SECRET_KEY,
  cryptoSecret: process.env.CRYPTO_SECRET_KEY,
  cryptoIv: process.env.CRYPTO_IV,
  port: process.env.PORT,
};
