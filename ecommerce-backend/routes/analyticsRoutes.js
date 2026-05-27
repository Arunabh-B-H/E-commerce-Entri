const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/analyticsController');

router.route('/recommendations').get(getRecommendations);

module.exports = router;
