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
  const { orderId, statusIndex } = req.body; // Changed from newStatus to statusIndex

  if (statusIndex === undefined || statusIndex < 0) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid status index (0-6)",
    });
  }

  try {
    const tracking = await Tracking.findOne({ orderId: orderId });

    if (!tracking) {
      return res.status(404).json({
        success: false,
        message: "Tracking record not found",
      });
    }

    // Validate status index
    if (statusIndex >= tracking.statusList.length) {
      return res.status(400).json({
        success: false,
        message: `Status index must be between 0 and ${tracking.statusList.length - 1}`,
      });
    }

    // Update all status flags based on index
    tracking.statusList.forEach((status, index) => {
      status.isPast = index < statusIndex;
      status.isCurrent = index === statusIndex;
      status.isUpcoming = index > statusIndex;
    });

    tracking.currentStatusIndex = statusIndex;
    
    // Check if completed (reached last status)
    if (statusIndex === tracking.statusList.length - 1) {
      tracking.isCompleted = true;
    }

    await tracking.save();

    res.status(200).json({
      success: true,
      message: `Status updated to: ${tracking.statusList[statusIndex].title}`,
      body: tracking,
    });
  } catch (e) {
    console.error("Update tracking error:", e);
    res.status(500).json({
      success: false,
      message: e.message || "Failed to update tracking status",
    });
  }
};

module.exports = { getTrackingStatus, updateTrackingStatus };