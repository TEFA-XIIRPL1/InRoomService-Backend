const express = require('express');

const router = express.Router();
const subType = require('../services/subType.service');

router.get('/', subType.getSubtypes);

router.post('/create', subType.createSubType);

router.put('/update/:id', subType.updateSubType);

router.delete('/delete/:id', subType.remove);

module.exports = router;
