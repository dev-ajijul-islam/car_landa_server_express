const connectDB = require("../config/db");
const Car = require("../models/Car");

const getCarLocations = async (req, res) => {
  await connectDB();
  const { brand, model, fuelType } = await req.query;
  let query = {};

  if (brand) {
    query.brand = brand;
  }
  if (model) {
    query.model = model;
  }
  if (fuelType) {
    query["specs.fuelType"] = fuelType;
  }

  console.log(`------------------- ${JSON.stringify(query)}`);

  try {
    const result = await Car.find(query).distinct("location.country");
    console.log(`----------------------------------------xxxx${result}`);
    res.status(200).send({
      success: true,
      message: "loading car location success",
      body: result,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: `loading location failed ${e.message}`,
    });
  }
};

module.exports = getCarLocations;
