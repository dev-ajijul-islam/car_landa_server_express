var admin = require("firebase-admin");
var serviceAccount = require("../config/carlanda-3b43b-firebase-adminsdk-fbsvc-248df20638.json");
const User = require("../models/User.js");
const connectDB = require("../config/db");

if (!admin.app.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const authMiddleware = async (req, res, next) => {
  const token = await req.headers.token;
  await connectDB();
  try {
    if (!token) {
      return res.status(403).send({
        success: false,
        message: "Forbidden",
      });
    }

    const decodedUser = await admin.auth().verifyIdToken(token);

    if (!decodedUser) {
      return res.status(403).send({
        success: false,
        message: "Forbidden",
      });
    }

    const userFromDB = await User.findOne({ email: decodedUser.email });

    const authorized = userFromDB.email == decodedUser.email;

    if (!authorized) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized",
      });
    }
    req.user = userFromDB;
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(401).send({
      success: false,
      message: `Authorization failed ${e.emssage}`,
    });
  }
};

module.exports = authMiddleware;
