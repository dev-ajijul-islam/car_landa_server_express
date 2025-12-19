const getCarModels = require("../controllers/carModelController");

const express = require("express");

const router = express.Router();

router.get("/",getCarModels);

module.exports = router;
