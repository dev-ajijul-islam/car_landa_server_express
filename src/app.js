const express = require("express");
const userRoutes = require("./routes/userRoutes.js");
const carRoutes = require("./routes/carRoutes.js");

const app = express();

app.use(express.json());

app.use("/user", userRoutes);
app.use("/cars",carRoutes);

module.exports = app;
