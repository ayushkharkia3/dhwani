const express = require('express');

const router = express.Router();

const districtController = require('../../controllers/district/district.controller');

router.get('/', districtController.getDistricts);

router.post('/', districtController.postDistricts);

module.exports = router;