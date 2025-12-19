const connectDB = require("../config/db");
const Car = require("../models/Car");

const getCarFurlTypes = async (req, res) => {
  await connectDB();
  const { brand, model } = await req.query;
  let query = {};

  if (brand) {
    query.brand = brand;
  }
  if (model) {
    query.model = model;
  }
  try {
    const result = await Car.find(query).distinct("specs.fuelType");
    res.status(200).send({
      success: true,
      message: "fuel type loading success",
      body: result,
    });
  } catch (e) {
    res.status(500).send({
      success: true,
      message: `loading fuleTypes failed ${e.message}`,
    });
  }
};


module.exports = getCarFurlTypes;