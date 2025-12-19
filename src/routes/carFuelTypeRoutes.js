const express = require("express");
const getCarFurlTypes = require("../controllers/carFuelTypesController");

const router = express.Router();

router.get("/",getCarFurlTypes);

module.exports = router;