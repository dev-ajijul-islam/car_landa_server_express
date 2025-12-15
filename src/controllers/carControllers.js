const Car = require("../models/Car");
const connectDB = require("../config/db.js");
const { Query } = require("firebase-admin/firestore");

const getCars = async (req, res) => {
  const { limit, carTypeId, title, isFeatured, isHotDeal, isActive } =
    await req.query;
  let query = {};
  try {
    await connectDB();
    if (carTypeId) {
      query.carTypeId = carTypeId;
    }
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (isFeatured) {
      query["flags.isFeatured"] = isFeatured == "true";
    }
    if (isHotDeal) {
      query["flags.isHotDeal"] = isHotDeal == "true";
    }
    if (isActive) {
      query["flags.isActive"] = isActive == "true";
    }
    const result = await Car.find(query).limit(limit);
    res.status(200).send({
      success: true,
      message: "Car Loaded successfully",
      body: result,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: `Loading car failed ${e.message}`,
    });
  }
};

module.exports = { getCars };
