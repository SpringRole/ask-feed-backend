const express = require("express");

const mongoose = require("mongoose");
const cors = require('cors')
const bcryptjs = require("bcryptjs");
const app = express();
require("./db/connectionDB")
const authRoutes =require("./routes/auth")
app.use(express.json());
app.use(cors())

app.use('/api',authRoutes)

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const userexist = await User.findOne({ email });
//   if (userexist) {
//     const matchpassword = await bcryptjs.compare(password,userexist.password );
//     if (matchpassword) {
//       res.send("login successfully!");
//     } else {
//       res.send("Invalid password");
//     }
//   } else {
//     res.send("Invalid Email or password!");
//   }
// });

app.listen(process.env.PORT || 2000,()=>{
   console.log("server running on port 2000")
});