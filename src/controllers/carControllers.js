const Car = require("../models/Car");
const connectDB = require("../config/db.js");
const { Query } = require("firebase-admin/firestore");
const mongoose = require("mongoose");

///============================get cars===========================

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

///============================get car by id ===========================

const getCarById = async (req, res) => {
  const { id } = await req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({
      success: false,
      message: "Car not found",
      body: null,
    });
  }

  try {
    await connectDB();
    const result = await Car.findById(id);
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Car not found",
        body: result,
      });
    }

    res.status(200).send({
      success: true,
      message: "Car loaded successfully",
      body: result,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      message: "Car Loading failed",
    });
  }
};



module.exports = { getCars, getCarById };
