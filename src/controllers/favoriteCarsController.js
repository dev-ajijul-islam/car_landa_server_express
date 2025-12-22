
const connectDB = require("../config/db");
const Favorite = require("../models/Favorite");

const createFavorite = async (req, res) => {
  const { carId } = req.body;
  const userId = req.user.id;

  await connectDB();

  try {
    const favorite = await Favorite.create({
      userId,
      carId,
    });

    res.status(201).json({
      success: true,
      data: favorite,
    });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Already bookmarked",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = createFavorite;
