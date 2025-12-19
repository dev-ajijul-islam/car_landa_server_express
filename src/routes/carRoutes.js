const express = require("express");
const {getCars, getCarById, getCarTypeId} = require("../controllers/carControllers.js");

const route = express.Router();

route.get("/",getCars);
route.get("/:id",getCarById);


module.exports = route;