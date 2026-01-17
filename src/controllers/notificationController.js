const Notification = require("../models/Notification.js");
const connectDB = require("../config/db");

const createNotification = async (req, res) => {
  const data = await req.body;
  await connectDB();
  try {
    const result = await Notification.create(data);
    res.status(200).send({
      success: true,
      message: "notification created succesfully",
      body: result,
    });
  } catch (e) {
    res.status(400).send({
      success: true,
      message: `notification create Failed ${e}`,
    });
  }
};

const getNotifications = async (req, res) => {
 
  const { uid } = await req.fireUser;
  await connectDB();
  try {
    const result = await Notification.find({ userId : uid });
    res.status(200).send({
      success: true,
      message: "notification get succesfully",
      body: result,
    });
  } catch (e) {
    res.status(400).send({
      success: true,
      message: `notification get Failed ${e}`,
    });
  }
};

module.exports = {
  createNotification,
  getNotifications,
};
