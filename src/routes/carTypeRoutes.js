const express = require("express");
const getCarTypeId = require("../controllers/carTypeIdController");

const router = express.Router();

router.get("/",getCarTypeId);

module.exports = router;