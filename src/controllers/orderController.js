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
          iconCodePoint: 58344, 
          isFirst: true,
          isPast: false,      
          isCurrent: true,    
          isUpcoming: false,
          isLast: false
        },
        {
          title: "Payment Pending",
          subtitle: "Waiting for payment confirmation.",
          iconCodePoint: 59552, 
          isFirst: false,
          isPast: false,
          isCurrent: false,    
          isUpcoming: true,   
          isLast: false
        },
        {
          title: "Vehicle Prepared",
          subtitle: "Your vehicle is being prepared for shipping.",
          iconCodePoint: 59614, 
          isFirst: false,
          isPast: false,
          isCurrent: false,
          isUpcoming: true,
          isLast: false
        },
        {
          title: "Vehicle Shipped",
          subtitle: "Your vehicle has been loaded onto the vessel.",
          iconCodePoint: 59658, 
          isFirst: false,
          isPast: false,
          isCurrent: false,
          isUpcoming: true,
          isLast: false
        },
        {
          title: "Vessel Departure",
          subtitle: "The ship carrying your car has departed the port.",
          iconCodePoint: 58009, 
          isFirst: false,
          isPast: false,
          isCurrent: false,
          isUpcoming: true,
          isLast: false
        },
        {
          title: "Arrived at Port",
          subtitle: "Your car has reached the destination port.",
          iconCodePoint: 57689, 
          isFirst: false,
          isPast: false,
          isCurrent: false,
          isUpcoming: true,
          isLast: false
        },
        {
          title: "Delivered",
          subtitle: "Congratulations! Your vehicle has been delivered.",
          iconCodePoint: 59530, 
          isFirst: false,
          isPast: false,
          isCurrent: false,
          isUpcoming: true,
          isLast: true
        }
      ],
      currentStatusIndex: 0, 
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

// ================================= Get User Orders with Tracking ========================
const getMyOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ userId: userId })
      .populate("carId")
      .sort({ createdAt: -1 })
      .lean();

    const ordersWithTracking = await Promise.all(
      orders.map(async (order) => {
        const tracking = await Tracking.findOne({ orderId: order._id }).lean();
        return {
          ...order,
          tracking: tracking?.statusList || [],
        };
      })
    );

    res.status(200).send({
      success: true,
      message: "Orders with tracking retrieved successfully",
      body: ordersWithTracking,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Server error while fetching orders with tracking",
    });
  }
};

module.exports = { getMyOrders };


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