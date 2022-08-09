const mongoose = require('mongoose');

const SignUpSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email : {
        type : String,
        required: true,
    },
    customer_id: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const SignupModel = mongoose.model('User', SignUpSchema)

module.exports = SignupModel;