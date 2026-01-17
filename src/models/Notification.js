const  mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    userId : {
        type : String,
        required : true
    }
});

const model  = mongoose.models.notification || mongoose.model("notification",notificationSchema);

module.exports = model;