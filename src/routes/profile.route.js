const express = require('express');

const router = express.Router();
const profile = require('../services/profile.service');

const {
  phoneValidation,
  emailValidation,
  nikValidation,
} = require('../validations/profile.validation');

router.get('/', profile.getData);
router.put('/updateNumber', phoneValidation, profile.updateNumber);
router.put('/updateEmail', emailValidation, profile.updateEmail);
router.put('/updateNIK', nikValidation, profile.updateNIK);

module.exports = router;
