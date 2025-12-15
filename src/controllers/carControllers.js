const Car = require("../models/Car");
const connectDB = require("../config/db.js");

const getCars = async (req, res) => {
  try {
    await connectDB();
    const result = await Car.find();
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
