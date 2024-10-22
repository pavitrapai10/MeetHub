// /routes/smsRoutes.js
const express = require('express');
const { sendEventSms } = require('../controllers/smsController');

const router = express.Router();

router.post('/send-sms', sendEventSms);

module.exports = router;
