const epress = require("express");
const {createFavorite} = require("../controllers/bookFavoriteController")

const router = express.Router();


router.post("/",createFavorite);



module.exports = router;