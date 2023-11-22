const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const { serviceInputValidation } = require('../validations/service.validation');

const router = express.Router();

const services = require('../services/services.service');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  '/create-service',
  upload.single('picture'),
  serviceInputValidation,
  services.createService,
);
router.get('/:serviceTypeId', services.getService);
router.get('/:serviceTypeId/latest', services.getServiceLatest);
router.put('/update', upload.single('picture'), serviceInputValidation, services.updateService);
router.delete('/delete', services.deleteService);

module.exports = router;
