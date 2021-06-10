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
  recipients:
    [
        recipientSchema  
    ],
  yes: {
    type: Number,
    default: 0,
  },
  No: {
    type: Number,
    default: 0,
  },
//   _user:{
    // type:mongoose.Schema.Types.ObjectId,
    // ref:'User},'
   //relationship between survey and an individual user
   dateSent: Date,
   lastResponded: Date
});


const Survey = mongoose.model("Survey", surveySchema);
module.exports = { Survey };
