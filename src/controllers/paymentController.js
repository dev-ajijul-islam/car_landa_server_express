const Order = require("../models/Order");
const Tracking = require("../models/Tracking");

// ===================== IPN Listener (SSLCommerz Callback) =====================
const handleIPN = async (req, res) => {
  try {
    const {
      tran_id,
      status,
      amount,
      bank_tran_id,
      card_type,
      currency,
      store_amount,
    } = req.body;

    // Validate required fields
    if (!tran_id || !status) {
      return res.status(400).json({
        success: false,
        message: "Invalid IPN data",
      });
    }

    // Extract order ID from transaction ID (format: orderId_timestamp)
    const orderId = tran_id.split('_')[0];

    // Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if payment already processed
    if (order.paymentStatus === 'Paid') {
      return res.status(200).json({
        success: true,
        message: "Payment already processed",
      });
    }

    // Validate payment amount
    const paymentAmount = parseFloat(amount);
    const orderAmount = order.totalAmount;
    
    if (Math.abs(paymentAmount - orderAmount) > 0.01) {
      return res.status(400).json({
        success: false,
        message: "Payment amount mismatch",
      });
    }

    // Process based on payment status
    if (status === 'VALID' || status === 'VALIDATED') {
      // Update order payment status
      order.paymentStatus = 'Paid';
      order.paymentMethod = 'SSLCommerz';
      order.paymentTransactionId = bank_tran_id || tran_id;
      order.paymentDate = new Date();
      order.ipnValidated = true;
      await order.save();

      // Update tracking status to "Payment Confirmed" (index 1)
      const tracking = await Tracking.findOne({ orderId: order._id });
      if (tracking) {
        // Set status index to 1 (Payment Confirmed)
        await tracking.updateStatus(1);
      }

      return res.status(200).json({
        success: true,
        message: "Payment confirmed successfully",
      });
    } else if (status === 'FAILED' || status === 'CANCELLED') {
      // Update order payment status to Failed
      order.paymentStatus = 'Failed';
      await order.save();

      return res.status(200).json({
        success: false,
        message: "Payment failed or cancelled",
      });
    } else {
      // Other statuses (PENDING, UNATTEMPTED, etc.)
      return res.status(200).json({
        success: false,
        message: `Payment status: ${status}`,
      });
    }

  } catch (error) {
    console.error("IPN processing error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error processing IPN",
    });
  }
};

// ===================== Manual Payment Confirmation (Fallback) =====================
const confirmPayment = async (req, res) => {
  try {
    const { orderId, transactionId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID required",
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if already paid
    if (order.paymentStatus === 'Paid') {
      return res.status(200).json({
        success: true,
        message: "Order already paid",
      });
    }

    // Update order
    order.paymentStatus = 'Paid';
    order.paymentMethod = 'SSLCommerz';
    order.paymentTransactionId = transactionId || `manual_${Date.now()}`;
    order.paymentDate = new Date();
    await order.save();

    // Update tracking
    const tracking = await Tracking.findOne({ orderId: order._id });
    if (tracking) {
      await tracking.updateStatus(1);
    }

    return res.status(200).json({
      success: true,
      message: "Payment confirmed manually",
      body: order,
    });

  } catch (error) {
    console.error("Manual confirmation error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error confirming payment",
    });
  }
};

// ===================== Get Payment Status =====================
const getPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).select('paymentStatus paymentMethod paymentDate totalAmount');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment status retrieved",
      body: {
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        paymentDate: order.paymentDate,
        totalAmount: order.totalAmount,
        currency: 'USD',
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  handleIPN,
  confirmPayment,
  getPaymentStatus,
};