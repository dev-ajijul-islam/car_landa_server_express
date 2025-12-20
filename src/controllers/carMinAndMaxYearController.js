const connectDB = require("../config/db");
const Car = require("../models/Car");

const getMinAndmaxYear = async (req, res) => {
  await connectDB();
  const { brand, model, fuelType } = await req.query;
  let query = {};

  if (brand) {
    query.brand = brand;
  }
  if (model) {
    query.model = model;
  }

  console.log(`------------------- ${JSON.stringify(query)}`);

  try {
    const result = await Car.find(query).distinct("year");

    const max = Math.max(...result);
    const min = Math.min(...result);

    res.status(200).send({
      success: true,
      message: "loading car min and max year success",
      body: {
        max: max,
        min: min,
      },
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: `loading min and max year failed ${e.message}`,
    });
  }
};

module.exports = getMinAndmaxYear;
