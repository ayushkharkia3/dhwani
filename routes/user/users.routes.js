const express = require('express');

const router = express.Router();

const userController = require('../../controllers/users/users.controllers');

router.post('/register', userController.postRegister);

router.post('/login', userController.postLogin);

module.exports = router;