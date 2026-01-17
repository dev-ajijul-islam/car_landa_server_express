const {getNotifications,createNotification} = require("../controllers/notificationController.js");
const express = require("express");

const router = express.Router();

router.post("/create",createNotification);
router.get("/get",getNotifications);


module.exports = router;