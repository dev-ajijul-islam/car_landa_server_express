const express = require("express");
const {createFavorite,getFavoriteCars,deleteFavorite} = require("../controllers/favoriteCarsController");

const router = express.Router();

router.post("/", createFavorite);
router.get("/",getFavoriteCars);
router.delete("/delete/:id", deleteFavorite);

module.exports = router;
