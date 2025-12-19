const express = require("express");
const getCarBrands = require("../controllers/carBrandController");


const router = express.Router();

router.get("/",getCarBrands);

module.exports = router;