const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
require("dotenv").config();
require("./db/connectionDB");
require('./models/user')
require('./models/Survey')
const authRoutes = require("./routes/auth");
const surveyRoutes = require("./routes/survey");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/survey", surveyRoutes);
app.use("/api", authRoutes);

app.listen(process.env.PORT || 2000, () => {
  console.log("server running on port 2000");
});
