const express = require("express");
const userRoutes = require("./routes/userRoutes.js");

const app = express();

app.use(express.json());

app.use("/user", userRoutes);

module.exports = app;
