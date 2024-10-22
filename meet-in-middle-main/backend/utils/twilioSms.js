// /utils/twilioSms.js
const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;   
const client = twilio(accountSid, authToken);

const sendSms = (to, body) => {
    return client.messages.create({
        body,
        to,   
        from: process.env.TWILIO_PHONE_NO 
    });
};

module.exports = sendSms;
