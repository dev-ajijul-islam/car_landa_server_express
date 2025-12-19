const express = require("express");
const getCarLocations = require("../controllers/carLocationsController");

const router = express.Router();

router.get("/",getCarLocations);

module.exports = router;