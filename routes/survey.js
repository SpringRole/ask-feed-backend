const express = require("express");
const { createSurvey } = require("../controllers/survey");
const router = express.Router();

router.post("/createsurvey", createSurvey);

module.exports = router;
