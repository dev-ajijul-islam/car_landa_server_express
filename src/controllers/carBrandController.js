const connectDB = require("../config/db");
const Car = require("../models/Car");

const getCarBrands = async (req, res) => {
  await connectDB();
  try {
    const result = await Car.distinct("brand");
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "brand not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "brand loaded successfully",
      body: result,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: `Something wrong ${e.message}`,
    });
  }
};

module.exports = getCarBrands;