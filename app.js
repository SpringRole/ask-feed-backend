const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
require("dotenv").config();
require("./db/connectionDB");
require("./models/user");
require("./models/survey");
const authRoutes = require("./routes/auth");
const surveyRoutes = require("./routes/survey");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/survey", surveyRoutes);
app.use("/api", authRoutes);
app.get("/health", function (req, res) {
  const message = "Running on port " + process.env.PORT;
  return res.send(message);
});
app.listen(process.env.PORT || 3000, () => {
  console.log("server running on port 3000");
});
