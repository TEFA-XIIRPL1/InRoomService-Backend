const express = require('express');
const multer = require('multer');

const router = express.Router();

const services = require('../services/services.service');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/:serviceTypeId', services.getService);
router.get('/:serviceTypeId/:id', services.getServiceById);
router.post(
  '/create-service',
  upload.single('picture'),
  services.createService,
);
router.delete('/delete/:id', services.deleteService);
router.put('/update/:id', upload.single('picture'), services.updateService);

module.exports = router;
