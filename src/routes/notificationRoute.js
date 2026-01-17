const {getNotifications,createNotification} = require("../controllers/notificationController.js");
const express = require("express");

const router = express.Router();

router.post("/create",createNotification);
router.get("/:userId",getNotifications);


module.exports = router;