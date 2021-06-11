const express = require("express");
const router = express.Router();
const { createSurvey } = require("../controllers/survey");

router.post("/createsurvey", createSurvey);

module.exports = router;