const Car = require("../models/Car");
const connectDB = require("../config/db.js");
const { Query } = require("firebase-admin/firestore");
const mongoose = require("mongoose");

///============================get cars with title search , type , and flags  ===========================
const getCars = async (req, res) => {
  const {
    limit,
    carTypeId,
    title,
    brand,
    model,
    isFeatured,
    isHotDeal,
    isActive,
    maxYear,
    minYear,
    maxPrice,
    minPrice,
    fuelType,
    location,
  } = req.query;

  let query = {};
  try {
    await connectDB();


    const isValid = (val) => val && val !== "null" && val !== "undefined" && val !== "";

    if (isValid(carTypeId)) query.carTypeId = carTypeId;
    if (isValid(brand)) query.brand = brand;
    if (isValid(model)) query.model = model;
    if (isValid(fuelType)) query["specs.fuelType"] = fuelType;
    if (isValid(location)) query["location.country"] = location;


    if (isValid(title)) {
      query.title = { $regex: title.trim(), $options: "i" };
    }

    // Flags
    if (isValid(isFeatured)) query["flags.isFeatured"] = isFeatured === "true";
    if (isValid(isHotDeal)) query["flags.isHotDeal"] = isHotDeal === "true";
    if (isValid(isActive)) query["flags.isActive"] = isActive === "true";

    // Price Range
    if (isValid(minPrice) || isValid(maxPrice)) {
      query["pricing.sellingPrice"] = {};
      if (isValid(minPrice)) query["pricing.sellingPrice"].$gte = Number(minPrice);
      if (isValid(maxPrice)) query["pricing.sellingPrice"].$lte = Number(maxPrice);
    }

    // Year Range
    if (isValid(minYear) || isValid(maxYear)) {
      query.year = {};
      if (isValid(minYear)) query.year.$gte = Number(minYear);
      if (isValid(maxYear)) query.year.$lte = Number(maxYear);
    }

    console.log("Final Query Object:", JSON.stringify(query)); 

    const result = await Car.find(query).limit(Number(limit) || 0);

    res.status(200).send({
      success: true,
      message: "Car Loaded successfully",
      count: result.length,
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
