const connectDB = require("../config/db");
const Tracking = require("../models/Tracking");

// ===================== Get Tracking Status by Order ID / Code =====================
const getTrackingStatus = async (req, res) => {
  const { id } = req.params;

  await connectDB();

  try {
    const tracking = await Tracking.findOne({ orderId: id })
      .populate("carId")
      .lean();

    if (!tracking) {
      return res.status(404).json({
        success: false,
        message: "No tracking information found for this code",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tracking data retrieved successfully",
      body: tracking,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching tracking data",
    });
  }
};

// ===================== Update Tracking Status (For Admin) =====================
const updateTrackingStatus = async (req, res) => {
  const { orderId, newStatus } = req.body;

  try {
    const tracking = await Tracking.findOne({ orderId: orderId });

    if (!tracking) {
      return res.status(404).json({
        success: false,
        message: "Tracking record not found",
      });
    }

    tracking.statusList.forEach((status) => {
      status.isCurrent = false;
      status.isUpcoming = false;
      status.isPast = true;
    });

    tracking.statusList.push(newStatus);

    await tracking.save();

    res.status(200).json({
      success: true,
      message: "Tracking status updated",
      body: tracking,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to update tracking status",
    });
  }
};

module.exports = { getTrackingStatus, updateTrackingStatus };
