const connectDB = require("../config/db");
const Order = require("../models/Order");
const Tracking = require("../models/Tracking"); 

// ================================= Create Order = require("../models/Order"); ===============================
const createOrder = async (req, res) => {
  const {
    carId,
    deliveryOption,
    totalAmount,
    paymentMethod,
    fullName,
    email,
    phone,
    location,
  } = req.body;
  const userId = req.user.id;

  await connectDB();

  try {
    const order = await Order.create({
      carId,
      userId,
      deliveryOption,
      totalAmount,
      paymentMethod,
      fullName,
      email,
      phone,
      location,
      paymentStatus: "Pending", 
    });

   
    await Tracking.create({
      orderId: order._id,
      carId: carId,
      statusList: [
        {
          title: "Order Placed",
          subtitle: "Your order has been placed successfully.",
          iconCodePoint: 58344,
          isFirst: true,
          isPast: true,
          isCurrent: true,
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      body: order,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Failed to place order. Server error.",
    });
  }
};

// ================================= Get User Orders ========================
const getMyOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ userId: userId })
      .populate("carId") 
      .sort({ createdAt: -1 }) 
      .lean();

    res.status(200).send({
      success: true,
      message: "Orders retrieved successfully",
      body: orders,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
    });
  }
};

// ================================= Get Order Details ========================
const getOrderDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate("carId").lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Order details found",
      body: order,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { createOrder, getMyOrders, getOrderDetails };
