const router = require('express').Router();
const { getPersonalityInsight } = require('../controllers/api')

router.get('/:twitter_handle', getPersonalityInsight)

module.exports = router;