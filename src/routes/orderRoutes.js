const express = require("express");
const { 
    createOrder, 
    getMyOrders, 
    getOrderDetails 
} = require("../controllers/orderController");

const router = express.Router();


router.post("/", createOrder);
router.get("/", getMyOrders); 
router.get("/:id", getOrderDetails); 

module.exports = router;