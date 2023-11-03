const express = require('express');

const router = express.Router();
const inRoomServiceController = require('../controllers/inRoomService.controller');

/* GET programming languages. */
router.get('/', inRoomServiceController.get);

/* POST programming language */
router.post('/', inRoomServiceController.create);

/* PUT programming language */
router.put('/:id', inRoomServiceController.update);

/* DELETE programming language */
router.delete('/:id', inRoomServiceController.remove);

module.exports = router;
