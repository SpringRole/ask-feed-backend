const express = require('express');
const survey = require('../controllers/createservey')
const router = express.Router();
router.post('/createservey',create_survey);
router.get('/email/:title', invite_user);
module.exports = router;
