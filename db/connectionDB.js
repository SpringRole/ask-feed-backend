const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://santan:*Saheb13*@cluster0.cnnl3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}) .then(() => console.log("DB connected established"))
   .catch(err => console.log("DB Connection error: " , err));