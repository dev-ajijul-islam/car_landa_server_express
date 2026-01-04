const express = require("express");
const { updateProfile } =  require("../controllers/userController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();


router.put("/:userId",authMiddleware, updateProfile);

module.exports = router;