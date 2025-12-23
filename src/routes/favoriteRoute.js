const express = require("express");
const {createFavorite,getFavoriteCars} = require("../controllers/favoriteCarsController");

const router = express.Router();

router.post("/", createFavorite);
router.get("/",getFavoriteCars);

module.exports = router;
