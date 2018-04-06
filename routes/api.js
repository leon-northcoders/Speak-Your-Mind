const express = require('express');
const router = express.Router();
const { getSpeech, getPersonalityInsight } = require('../controllers/api');

router.use(express.static(__dirname + '/public'))
router.get('/', getSpeech);



module.exports = router;