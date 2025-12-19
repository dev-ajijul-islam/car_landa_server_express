const connectDB = require("../config/db");
const Car = require("../models/Car");

const getCarModels = async (req, res) => {
  const { brand } = await req.query;
  await connectDB();
  try {
    const result = await Car.find({ brand: brand }).distinct("model");
    if (!result) {
      return res.ststus(404).send({
        success: true,
        message: "model not found",
      });
    }
    res.status(200).send({
      succes: true,
      message: "car model loade succes fully",
      body: result,
    });
  } catch (e) {
    res.status(500).send({
      success: true,
      message: `car model loading failed ${e.message}`,
    });
  }
};

module.exports = getCarModels;
