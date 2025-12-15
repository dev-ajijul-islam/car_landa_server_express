var mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Emai is required"],
    unique: [true, "Already exist with this email"],
    trim: true,
  },
  authenticatedBy: {
    enum : ["google","credentials"],
    type: String,
    required: true,
  },
});
 const User = mongoose.models.user || mongoose.model("user", UserSchema);

 module.exports = User;
