/* eslint-disable operator-linebreak */
const express = require('express');

const router = express.Router();
const room = require('../services/room.service');
const { roomInputValidation } = require('../validations/room.validation');
const { setStorage, setFileFilter, uploadFile } = require('../utils/helper.util');

// Rute untuk membuat product request (CREATE)
const storage = setStorage();
const fileFilter = setFileFilter();
const options = {
  storage,
  fileFilter,
};

router.get('/', room.getAllData);
router.get('/:id', room.getData);

router.post('/create', uploadFile(options, 'roomImage'), roomInputValidation, room.createData);

router.put('/update/:id', uploadFile(options, 'roomImage'), roomInputValidation, room.updateData);

router.delete('/delete/:id', room.deleteData);

module.exports = router;
