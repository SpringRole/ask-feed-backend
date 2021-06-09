const mongoose = require("mongoose");

const surveySchema = mongoose.Schema({
  title: {
    type: String,
  },
  type: {
    type: String,
  },
  questionsSet: [
    {
      ques: {
        type: String,
      },
      ans: {
        type: String,
      },
    },
  ],
});

const Survey = mongoose.model("Survey", surveySchema);
module.exports = { Survey };
