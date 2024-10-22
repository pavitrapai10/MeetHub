const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true, 
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,  // Regular expression for email validation
            'Please fill a valid email address'  // Custom error message if validation fails
        ]
    },
    phoneNumber: {
        type: String,
        required: true,
        
        
    },
    password: {
        type: String,
        required: true

    },
    otp: {
        type: String,
        otpExpiry: Date,
        isVerified: {
            type: Boolean,
            default: false
        }
    }


});

module.exports = mongoose.model('User', userSchema);
