const express = require("express");
const userRoutes = require("./routes/userRoutes.js");
const userUpdateRoutes = require("./routes/updateUserRoute.js");
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
const orderRoutes = require("./routes/orderRoutes.js");
const trackingRoutes = require("./routes/trackingRoutes.js");
const paymentRoutes = require('./routes/paymentRoutes');
const notificationRoutes = require('./routes/notificationRoute.js');



const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    return res.status(200).send({
        success : true,
        message : "carLanda server running"
    })
});

app.use("/user", userRoutes);
app.use("/users/update", userUpdateRoutes);
app.use("/cars", authMiddleware, carRoutes);
app.use("/carType", carTypeIdRoutes);
app.use("/carBrands", getCarBrands);
app.use("/carModels", carModelRoutes);
app.use("/carFuelTypes", carFuelTypeRouts);
app.use("/carLocations", carLocationRoutes);
app.use("/carMinAndMaxYear", carMinAndmaxYearRoutes);
app.use("/carMinAndMaxPrice", carMinAndmaxPriceRoutes);
app.use("/favorite", authMiddleware, favoriteRoutes);
app.use("/orders", authMiddleware, orderRoutes);
app.use("/tracking", authMiddleware, trackingRoutes);
app.use('/payment',authMiddleware, paymentRoutes);

app.use("/notifications",authMiddleware,notificationRoutes);


module.exports = app;
