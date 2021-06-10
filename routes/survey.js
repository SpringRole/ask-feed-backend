const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const {Survey} = require('../models/survey')
// const { createSurvey } = require("../controllers/survey");
// const router = express.Router();
// router.post("/createsurvey", createSurvey);
//first need to cheak user is actually logged in

module.exports = (app)  => {
  app.post("api/surveys", requireLogin, requireCredits, (req, res) => {
    const { title, category, body, recipients } = req.body;
    const survey = new Survey({
      title,
      category,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    survey.save()
  });
};
// module.exports = router;
