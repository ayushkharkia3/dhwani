const express = require('express');

const router = express.Router();

const childController = require('../../controllers/child/child.controllers');

router.get('/', childController.getChild);

router.post('/', childController.postChild);

module.exports = router;