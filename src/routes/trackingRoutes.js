const express = require("express");
const {
  getTrackingStatus,
  updateTrackingStatus,
} = require("../controllers/trackingController");

const router = express.Router();

router.get("/:id", getTrackingStatus);

router.post("/update", updateTrackingStatus);

module.exports = router;
