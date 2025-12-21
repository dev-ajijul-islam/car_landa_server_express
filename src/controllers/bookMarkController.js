const connectDB = require("../");

const createBookMark = async (req, res) => {
  const { carId, userId } = await req.body;
  await connectDB();

  try {
   
  } catch (e) {
    res.status(500).send({
      success: false,
    });
  }
};
