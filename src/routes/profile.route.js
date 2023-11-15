const express = require('express');

const router = express.Router();
const profile = require('../services/profile.service');

router.get('/', profile.getData);

module.exports = router;
