const connectDB = require("../config/db");
const Car = require("../models/Car");

const getMinAndmaxPrice = async (req, res) => {
  await connectDB();
  const { brand, model, fuelType } = await req.query;
  let query = {};

  if (brand) {
    query.brand = brand;
  }
  if (model) {
    query.model = model;
  }

  try {
    const result = await Car.find(query).distinct("pricing.sellingPrice");

    const max = Math.max(...result);
    const min = Math.min(...result);
console.log(`----------------------------------------------${min,max}`);
    res.status(200).send({
      success: true,
      message: "loading car min and max price success",
      body: {
        max: max,
        min: min,
      },
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: `loading min and max price failed ${e.message}`,
    });
  }
};

module.exports = getMinAndmaxPrice;
