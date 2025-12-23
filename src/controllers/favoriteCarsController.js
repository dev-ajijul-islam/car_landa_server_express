const connectDB = require("../config/db");
const Favorite = require("../models/Favorite");

//=================================create favorite ===============================

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
      message : "Added to favorite success",
      body: favorite,
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

//=================================get a favorite cars========================
const getFavoriteCars= async(req,res)=>{
  const userId = await req.user.id;

  try{
    const favorites = await Favorite.find({userId : userId}).populate("carId").lean();
    const result = favorites.map(fav => ({
      ...fav.carId,
      isFavorite: true
    }));
    res.status(200).send({
      success : true,
      message : "getting favorite car success",
      body : result
    })
  }catch(e){
      res.status(500).json({
      success: false,
      message: "Server error",
    });
  }

}

module.exports = {createFavorite,getFavoriteCars};
