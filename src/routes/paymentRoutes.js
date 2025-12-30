const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/ipn", paymentController.handleIPN);

router.post("/confirm", paymentController.confirmPayment);

router.get("/status/:orderId", paymentController.getPaymentStatus);

module.exports = router;
