const express = require('express');

const router = express.Router();
const profile = require('../services/profile.service');

router.get('/', profile.getData);
router.put('/updateNumber', profile.updateNumber);
router.put('/updateEmail', profile.updateEmail);
router.put('/updateNIK', profile.updateNIK);

module.exports = router;
