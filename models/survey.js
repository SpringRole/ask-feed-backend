const mongoose = require("mongoose");
const recipientSchema= require('./recipient')
const surveySchema = mongoose.Schema({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  body: {
    type: String,
  },
  subject: {
    type: String,
  },
  recipients:[
       String
    ],
  yes: {
    type: Number,
    default: 0,
  },
  No: {
    type: Number,
    default: 0,
  },
  
  _user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
   dateSent: Date,
   lastResponded: Date
});
const Survey = mongoose.models.Survey||mongoose.model("Survey", surveySchema);
module.exports = { Survey };
