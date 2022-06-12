const express = require('express');
const router = express.Router();
const { exchangeRate } = require('../controllers/exchange');

router.route('/').get(exchangeRate)

module.exports = router