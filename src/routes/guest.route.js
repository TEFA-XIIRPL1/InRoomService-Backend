const express = require('express');

const router = express.Router();

const guest = require('../services/guest.service');

router.get('/:id', guest.get);

module.exports = router;
