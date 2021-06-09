const express = require('express');
const survey = require('../controllers/createservey')
const router = express.Router();
router.post('/createservey',create_survey);
module.exports = router;
