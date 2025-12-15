const express = require("express");
const { createUser, login } =  require("../controllers/userController.js");


const router = express.Router();

router.post("/create",createUser);
router.get("/login",login);

module.exports = router;