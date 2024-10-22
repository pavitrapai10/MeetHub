// /controllers/smsController.js
const sendSms = require('../utils/twilioSms');

exports.sendEventSms = async (req, res) => {
    const { title, date, time, place, description, phoneNumber } = req.body;

    try {
        const messageBody = `Event Details:
        Title: ${title}
        Date: ${date}
        Time: ${time}
        Place: ${place}
        Description: ${description}`;

        await sendSms(phoneNumber, messageBody);

        res.status(200).json({ message: 'SMS sent successfully' });
    } catch (error) {
        console.error('SMS Error:', error);
        res.status(500).json({ error: 'Failed to send SMS' });
    }
};
