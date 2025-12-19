const express = require("express");
const userRoutes = require("./routes/userRoutes.js");
const carRoutes = require("./routes/carRoutes.js");
const carTypeIdRoutes = require("./routes/carTypeRoutes.js");
const getCarBrands = require("./controllers/carBrandController.js");
const app = express();

app.use(express.json());

app.use("/user", userRoutes);
app.use("/cars",carRoutes);
app.use("/carType",carTypeIdRoutes);
app.use("/carBrands",getCarBrands);

module.exports = app;
