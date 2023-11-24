const express = require('express');
const { serviceInputValidation } = require('../validations/service.validation');

const router = express.Router();

const services = require('../services/services.service');
const { setStorage, setFileFilter, uploadFile } = require('../utils/helper.util');

const storage = setStorage();
const fileFilter = setFileFilter();
const options = {
  storage,
  fileFilter,
};

router.post(
  '/create-service',
  uploadFile(options, 'picture'),
  serviceInputValidation,
  services.createService,
);
router.get('/:serviceTypeId', services.getService);
router.get('/:serviceTypeId/latest', services.getServiceLatest);
router.put(
  '/update/:id',
  uploadFile(options, 'picture'),
  serviceInputValidation,
  services.updateService,
);
router.delete('/delete/:id', services.deleteService);

module.exports = router;
