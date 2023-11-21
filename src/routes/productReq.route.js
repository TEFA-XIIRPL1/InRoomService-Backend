/* eslint-disable operator-linebreak */
const express = require('express');

const router = express.Router();
const multer = require('multer');
const path = require('path');
const productReqService = require('../services/productReq.service');

// Rute untuk membuat product request (CREATE)
let filesaved;
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/assets/images');
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    filesaved = `${file.originalname.replace(ext, '')}-${uniqueSuffix}${ext}`;
    cb(null, filesaved);
  },
  fileFilter(req, file, cb) {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PNG, JPG, and JPEG files are allowed.'), false);
    }
  },
});
const upload = multer({ storage });

router.post('/create', upload.single('picture'), productReqService.create);

// Rute untuk mendapatkan semua product requests (READ)
router.get('/', productReqService.getAll);

// Rute untuk mendapatkan product request berdasarkan ID (READ)
router.get('/:id', productReqService.getProductReqById);

// Rute untuk mendapatkan product request berdasarkan status (READ)
router.get('/status/:status', productReqService.getProductReqByStatus);

// Rute untuk mengupdate product request (UPDATE)
router.put('/update/:id', upload.single('picture'), productReqService.update);

// Rute untuk menghapus product request (DELETE)
router.delete('/delete/:id', productReqService.remove);

// Rute untuk accept productReq
router.post('/accept/:id', productReqService.acceptProductReq);

// Rute untuk reject productReq
router.post('/reject/:id', productReqService.rejectProductReq);

module.exports = router;
