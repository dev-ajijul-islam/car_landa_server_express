const mongoose = require("mongoose");


const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    carId: {
      type: mongoose.Types.ObjectId,
      ref: "Car",
      required: true,
      index: true,
    },

    
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    versionKey: false,
  }
);

favoriteSchema.index(
  { userId: 1, carId: 1 },
  { unique: true }
);

module.exports =  mongoose.model("Favorite", favoriteSchema);
