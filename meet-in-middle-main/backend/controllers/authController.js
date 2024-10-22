const User = require('../models/User');
const generateOtp = require('../utils/otpGenerator');
const sendOtp = require('../utils/sendOtp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async(req, res)=> {
    const {email, phoneNumber, password} = req.body;
     
    try {
        let user = await User.findOne({email});
        if(user) return res.status(400).json({message : 'User already exists'});
    
        let userByPhone = await User.findOne({phoneNumber});
        if(userByPhone) return res.status(400).json({message : 'Phone Number already exists'});
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOtp();
    
        user = new User({
            email, 
            phoneNumber,
            password: hashedPassword,
            otp,
            otpExpiry: Date.now()+ 10*60*1000
        });
    
        await user.save();
        await sendOtp(phoneNumber, otp);
    
        res.status(201).json({message: 'SignUp Successful'});
    
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({error: error.message || 'Internal Server Error'});
    }
    

    
}

exports.verifyOtp = async(req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        if (user.isVerified) return res.status(400).json({ message: 'User already verified' });
        if (user.otp !== otp || Date.now() > user.otpExpiry) {
            return res.status(400).json({ message: 'Invalid or Expired Token' });
        }

        user.isVerified = true;
        user.otp = null; // Set otp to null instead of undefined
        user.otpExpiry = null; // Set otpExpiry to null
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login Successful', token });

    } catch (error) {
        console.error('Error occurred: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login Successful', token });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
