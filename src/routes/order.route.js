const express = require('express');

const router = express.Router();
const order = require('../services/order.service');
const { createOrderValidation, updateQtyValidation } = require('../validations/order.validation');
const middleware = require('../middlewares/auth.middleware');

router.post('/create', middleware(), createOrderValidation, order.create);
router.put('/update/qty/:id/:dordId', middleware(), updateQtyValidation, order.updateQty);
router.put('/update/newItem/:id', middleware(), order.updateNewItem);
router.delete('/delete/:id', middleware(), order.remove);

module.exports = router;
