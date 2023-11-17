/* eslint-disable operator-linebreak */
const express = require('express');

const router = express.Router();
const multer = require('multer');
const path = require('path');
const room = require('../services/room.service');

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
      !(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      )
    ) {
      cb(new Error('Invalid file type. Only PNG, JPG, and JPEG are allowed.'), false);
    } else {
      cb(null, true);
    }
  },
});
const upload = multer({ storage });

router.get('/', room.getAllData);
router.get('/:id', room.getData);

router.post('/create', upload.single('roomImage'), room.createData);

router.put('/update/:id', upload.single('roomImage'), room.updateData);

router.delete('/delete/:id', room.deleteData);

module.exports = router;
