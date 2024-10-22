const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

const sendOtp = async(phoneNumber, otp) => {
    try{
        await client.messages.create({
        body: `otp is ${otp}`, 
        from: process.env.TWILIO_PHONE_NO, 
        to: phoneNumber
        
        });
        console.log(`Otp sent to ${phoneNumber}`)
    }
    catch(error){
        console.log('Failed to send otp',error.message);
    }
}

module.exports = sendOtp;