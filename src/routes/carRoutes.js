const express = require("express");
const {getCars} = require("../controllers/carControllers.js");

const route = express.Router();

route.get("/",getCars);

module.exports = route;