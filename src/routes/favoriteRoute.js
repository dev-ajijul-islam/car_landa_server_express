const express = require("express");
const createFavorite = require("../controllers/favoriteCarsController");

const router = express.Router();

router.post("/", createFavorite);

module.exports = router;
