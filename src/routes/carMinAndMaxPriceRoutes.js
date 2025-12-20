const express = require("express");
const getMinAndmaxPrice = require("../controllers/carMinAndMaxPriceController");

const router = express.Router();

router.get("/",getMinAndmaxPrice);

module.exports = router;