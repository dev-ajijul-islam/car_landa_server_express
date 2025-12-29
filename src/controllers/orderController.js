const connectDB = require("../config/db");
const Order = require("../models/Order");
const Tracking = require("../models/Tracking"); 

// ================================= Create Order ===============================
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

    // Create tracking with ALL 7 statuses - Order Placed as current
    await Tracking.create({
      orderId: order._id,
      carId: carId,
      statusList: [
        {
          title: "Order Placed",
          subtitle: "Your order has been placed successfully.",
          iconCodePoint: 58344, // receipt_long
          isFirst: true,
          isPast: false,      // NOT past yet
          isCurrent: true,    // THIS is current (index 0)
          isUpcoming: false,
          isLast: false
        },
        {
          title: "Payment Pending",
          subtitle: "Waiting for payment confirmation.",
          iconCodePoint: 59552, // payment
          isFirst: false,
          isPast: false,
          isCurrent: false,    // NOT current (payment not done)
          isUpcoming: true,    // This is upcoming
          isLast: false
        },
        {
          title: "Vehicle Prepared",
          subtitle: "Your vehicle is being prepared for shipping.",
          iconCodePoint: 59614, // build
          isFirst: false,
          isPast: false,
          isCurrent: false,
          isUpcoming: true,
          isLast: false
        },
        {
          title: "Vehicle Shipped",
          subtitle: "Your vehicle has been loaded onto the vessel.",
          iconCodePoint: 59658, // local_shipping
          isFirst: false,
          isPast: false,
          isCurrent: false,
          isUpcoming: true,
          isLast: false
        },
        {
          title: "Vessel Departure",
          subtitle: "The ship carrying your car has departed the port.",
          iconCodePoint: 58009, // directions_boat
          isFirst: false,
          isPast: false,
          isCurrent: false,
          isUpcoming: true,
          isLast: false
        },
        {
          title: "Arrived at Port",
          subtitle: "Your car has reached the destination port.",
          iconCodePoint: 57689, // anchor
          isFirst: false,
          isPast: false,
          isCurrent: false,
          isUpcoming: true,
          isLast: false
        },
        {
          title: "Delivered",
          subtitle: "Congratulations! Your vehicle has been delivered.",
          iconCodePoint: 59530, // check_circle
          isFirst: false,
          isPast: false,
          isCurrent: false,
          isUpcoming: true,
          isLast: true
        }
      ],
      currentStatusIndex: 0, // Order Placed is current (index 0)
      isCompleted: false
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