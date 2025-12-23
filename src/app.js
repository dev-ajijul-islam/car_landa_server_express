const express = require("express");
const userRoutes = require("./routes/userRoutes.js");
const carRoutes = require("./routes/carRoutes.js");
const carTypeIdRoutes = require("./routes/carTypeRoutes.js");
const getCarBrands = require("./controllers/carBrandController.js");
const carModelRoutes = require("./routes/carModelRoutes.js");
const carFuelTypeRouts = require("./routes/carFuelTypeRoutes.js");
const carLocationRoutes = require("./routes/carLocationRoutes.js");
const carMinAndmaxYearRoutes = require("./routes/carMinAndMaxYearRoutes.js");
const carMinAndmaxPriceRoutes = require("./routes/carMinAndMaxPriceRoutes.js");
const favoriteRoutes = require("./routes/favoriteRoute.js");
const authMiddleware = require("./middlewares/authMiddleware.js");

const app = express();

app.use(express.json());

app.use("/user", userRoutes);
app.use("/cars", carRoutes);
app.use("/carType", carTypeIdRoutes);
app.use("/carBrands", getCarBrands);
app.use("/carModels", carModelRoutes);
app.use("/carFuelTypes", carFuelTypeRouts);
app.use("/carLocations", carLocationRoutes);
app.use("/carMinAndMaxYear", carMinAndmaxYearRoutes);
app.use("/carMinAndMaxPrice", carMinAndmaxPriceRoutes);
app.use("/favorite",authMiddleware,favoriteRoutes);

module.exports = app;
