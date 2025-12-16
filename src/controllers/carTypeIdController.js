const connectDB = require("../config/db");
const Car = require("../models/Car");

const getCarTypeId = async (req, res) => {
    await connectDB();
  try{
    const result = await Car.distinct("carTypeId");
    res.status(200).send({
      success : true,
      message : "carTypeId loaded successfully",
      body : result
    });
  }catch(e){
    res.status(500).send({
      success : false,
      message : `something wrong ${e.message}`
    });
  }
};

module.exports = getCarTypeId;