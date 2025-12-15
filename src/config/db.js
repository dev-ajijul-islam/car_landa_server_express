var mongoose = require("mongoose");

 const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb connected successfully");
    } catch (e) {
        console.log(`mongodb connection failed ${e}`);
    }
}

module.exports = connectDB;