const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
// const { createSurvey } = require("../controllers/survey");
// const router = express.Router();
// router.post("/createsurvey", createSurvey);
const Survey = mongoose.model("surveys");
//first need to cheak user is actually logged in
module.exports = (app) => {
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
  });
};

module.exports = router;
