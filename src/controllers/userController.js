var connectDB = require("../config/db.js");
const User = require("../models/User.js");
const admin = require("firebase-admin");

const serviceAccount = require("../config/carlanda-3b43b-firebase-adminsdk-fbsvc-248df20638.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

///===================sign up user======================

const createUser = async (req, res) => {
  const body = await req.body;
  try {
    await connectDB();
    const exist = await User.findOne({ email: body.email });
    const isGoogleUser = body.authenticatedBy == "google";

    if (exist) {
      if (isGoogleUser) {
        return res.status(201).send({
          success: true,
          message: "Sign In successfully",
        });
      }
      return res.status(409).send({
        success: false,
        message: "User Already Exist",
      });
    }

    const newUser = User(body);
    const result = await newUser.save();
    res.status(201).send({
      success: true,
      message: "Registration successfully",
    });
  } catch (e) {
    if (e.name == "ValidationError") {
      return res.status(422).send({
        success: false,
        message: e.message,
      });
    }
    return res.status(500).send({
      success: false,
      message: e.message,
    });
  }
};

///===================create user======================
const login = async (req, res) => {
  const { idToken } = await req.query;
  try {
    let userFromDB;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken.uid != null) {
      userFromDB = await User.findOne({ email: decodedToken.email });
    }

    if (userFromDB.email != null) {
      res.status(200).send({
        success: true,
        message: "Login successfull",
        body: decodedToken,
      });
    } else {
      res.status(401).send({
        success: false,
        message: "User not found",
      });
    }
  } catch (e) {
    if (e.code == "auth/argument-error") {
      res.status(401).send({
        success: false,
        message: "User Not found",
      });
    } else {
      res.status(500).send({
        success: false,
        message: e.message,
      });
    }
  }
};

module.exports = { createUser, login };
