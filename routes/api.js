const router = require('express').Router();
const { getTone, getPersonalityInsight } = require('../controllers/api');

router.get('/:twitter_handle', getTone);

module.exports = router;