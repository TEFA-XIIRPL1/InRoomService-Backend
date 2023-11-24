/* eslint-disable operator-linebreak */
const express = require('express');

const router = express.Router();
const productReqService = require('../services/productReq.service');
const { productReqInputValidation } = require('../validations/productReq.validation');
const { setStorage, setFileFilter, uploadFile } = require('../utils/helper.util');

// Rute untuk membuat product request (CREATE)
const storage = setStorage();
const fileFilter = setFileFilter();
const options = {
  storage,
  fileFilter,
};
router.post(
  '/create',
  uploadFile(options, 'picture'),
  productReqInputValidation,
  productReqService.create,
);

// Rute untuk mendapatkan semua product requests (READ)
router.get('/', productReqService.getAll);

// Rute untuk mendapatkan product request berdasarkan ID (READ)
router.get('/:id', productReqService.getProductReqById);

// Rute untuk mendapatkan product request berdasarkan status (READ)
router.get('/status/:status', productReqService.getProductReqByStatus);

// Rute untuk mengupdate product request (UPDATE)
router.put(
  '/update/:id',
  uploadFile(options, 'picture'),
  productReqInputValidation,
  productReqService.update,
);

// Rute untuk menghapus product request (DELETE)
router.delete('/delete/:id', productReqService.remove);

// Rute untuk accept productReq
router.post('/accept/:id', productReqService.acceptProductReq);

// Rute untuk reject productReq
router.post('/reject/:id', productReqService.rejectProductReq);

module.exports = router;
