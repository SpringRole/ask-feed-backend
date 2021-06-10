const mongoose= require('mongoose')

const recipientSchema=mongoose.Schema({
 email:
 {
   type: String
 },
 responded:{
     type:Boolean,default:false
    }
})

const Recipient = mongoose.model("Recipient", recipientSchema);
module.exports = {Recipient};
