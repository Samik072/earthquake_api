const express = require('express');
const router = express.Router();
const {getEarthquakes, getEarthquakeById} = require('../services/earthquakeService');

router.get('/', getEarthquakes)
router.get('/:id', getEarthquakeById);

module.exports = router;