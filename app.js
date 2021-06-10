const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const app = express();
require("dotenv").config();
require("./db/connectionDB");
const authRoutes = require("./routes/auth");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);

app.listen(process.env.PORT || 2000, () => {
  console.log("server running on port 2000");
});
