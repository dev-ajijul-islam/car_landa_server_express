const express = require("express");
const getMinAndMaxYear = require("../controllers/carMinAndMaxYearController");

const router = express.Router();

router.get("/",getMinAndMaxYear);

module.exports = router;