const express = require('express')
const { createSurvey } = require('../controllers/survey')
const router= express.Router()

router.post('/createSurvey',createSurvey,)


module.exports =router