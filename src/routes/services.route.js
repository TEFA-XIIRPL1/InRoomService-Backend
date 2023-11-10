const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
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
router.get('/:serviceTypeId/latest', services.getServiceLatest);
router.post(
  '/create-service',
  upload.single('picture'),
  services.createService,
);
router.delete('/delete/', services.deleteService);
router.put('/update/', upload.single('picture'), services.updateService);

module.exports = router;
