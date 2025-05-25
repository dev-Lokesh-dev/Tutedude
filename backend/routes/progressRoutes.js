const express = require('express');
const router = express.Router();
const controller = require('../controllers/progressController.js');

router.get('/:videoId', controller.getProgress);
router.post('/:videoId', controller.updateProgress);

module.exports = router;