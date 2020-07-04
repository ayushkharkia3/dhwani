const express = require('express');

const router = express.Router();

const stateController = require('../../controllers/state/state.controllers');

router.get('/', stateController.getStates);

router.post('/', stateController.postStates);

module.exports = router;