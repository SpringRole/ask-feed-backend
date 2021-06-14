const { response } = require("express");
const express = require("express");
const router = express.Router();
const {protect}=require('../middlewares/requireLogin')
const  { createSurvey,responseYes, responseNo, getSurvey } = require("../controllers/survey");

router.post("/createsurvey",protect,createSurvey);
router.put("/response/yes/:id",responseYes)
router.put("/response/no/:id",responseNo)
module.exports = router;