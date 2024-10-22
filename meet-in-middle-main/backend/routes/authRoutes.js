const express = require('express');
const {signup, signin, verifyOtp} = require('../controllers/authController');

const router = express.Router();
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/verifyOtp', verifyOtp);
module.exports = router;


