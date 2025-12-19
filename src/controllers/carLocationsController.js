const connectDB = require("../config/db");
const Car = require("../models/Car");

const getCarLocations = async (req, res) => {
  connectDB();
  const { brand, model, fuelType } = await req.query;
  const query = {};

  if (brand) {
    query.brand = brand;
  }
  if (model) {
    query.model = model;
  }
  if (fuelType) {
    query.fuelType = fuelType;
  }

  try {
    const result = await Car.find(query).distinct("location.country");
    res.status(200).send({
      success: true,
      message: "loading car location success",
      body : result
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: `loading location failed ${e.message}`,
    });
  }
};

module.exports = getCarLocations;
