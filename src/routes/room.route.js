const express = require('express');

const router = express.Router();
const room = require('../services/room.service');

router.get('/', room.getAllData);
router.get('/:id', room.getData);

router.post('/create', room.createData);

router.put('/update/:id', room.updateData);
router.patch('/patch/:id', room.patchData);

router.delete('/delete/:id', room.deleteData);

module.exports = router;
