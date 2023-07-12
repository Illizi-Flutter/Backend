const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        role: {
            type: String,
            enum: ['Admin', 'Client'],
        },
        resetCode: {
            type: Number
        }
    }

)
module.exports = mongoose.model('user', userSchema);