var mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Already exist with this email"],
      trim: true,
      lowercase: true,
    },

    authenticatedBy: {
      type: String,
      enum: ["google", "credentials"],
      required: true,
    },

    // ---------- OPTIONAL FIELDS ----------
    phone: {
      type: String,
      default: null,
    },

    address: {
      type: String,
      default: null,
    },

    passportIdUrl: {
      type: String, 
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.models.user || mongoose.model("user", UserSchema);

module.exports = User;
