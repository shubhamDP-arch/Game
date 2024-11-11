const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    otp: {
        type: String,
        require: true
    },
    shopid: {
        type: String,
        require: true
    }
})


const Otps = new mongoose.model("Otp", otpSchema)

module.exports = Otps