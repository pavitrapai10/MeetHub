require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the CORS package
const authRoutes = require('./routes/authRoutes');
const smsRoutes = require('./routes/smsRoutes');

const app = express();

// Use the cors middleware
app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sms', smsRoutes);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
