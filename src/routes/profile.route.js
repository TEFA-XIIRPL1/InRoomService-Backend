const express = require('express');

const router = express.Router();
const profile = require('../services/profile.service');

const {
  phoneValidation,
  emailValidation,
  nikValidation,
  imageValidation,
} = require('../validations/profile.validation');
const { setStorage, setFileFilter, uploadFile } = require('../utils/helper.util');

// Rute untuk membuat product request (CREATE)
const storage = setStorage();
const fileFilter = setFileFilter();
const options = {
  storage,
  fileFilter,
};

router.get('/', profile.getData);
router.put('/updateNumber', phoneValidation, profile.updateNumber);
router.put('/updateEmail', emailValidation, profile.updateEmail);
router.put('/updateNIK', nikValidation, profile.updateNIK);
router.put('/updateImage', uploadFile(options, 'picture'), imageValidation, profile.updateImage);

module.exports = router;
