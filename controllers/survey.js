const mongoose = require("mongoose");
const { Survey } = require("../models/survey");

const createSurvey = async (req, res) => {
  const survey = await Survey.create(req.body);
  res.send(survey);
};
module.exports = { createSurvey };
