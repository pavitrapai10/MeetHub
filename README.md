## Overview
**Meet in the Middle**  is a location-based app designed to help users organize meetings and find locations convenient for all attendees. The app dynamically suggests midpoint locations such as restaurants and cafes based on the real-time locations of participants.

The project is developed using React for the frontend, Node.js/Express for the backend, and MongoDB for the database. The application integrates Google Maps API for displaying a map component with markers and Google Places API to suggest meeting locations. Additionally, OTP-based user authentication is implemented using Twilio.


## **Features**

- **OTP-Based Authentication**: Secure user login and registration using OTP verification via Twilio.

- **Meeting Creation**: Organize meetings, set titles, descriptions, dates, and times.

- **Invitation System**: Send meeting invitations via SMS, allowing users to accept or decline.

- **Real-Time Location Fetching**: Dynamically retrieve users' locations when joining a meeting.

- **Location Suggestions**: Suggest nearby places like cafes, restaurants, etc., based on the average location of all attendees.


## **Project Structure**
```.
├── backend/                 # Backend server files (Node.js, Express)
│   ├── controllers/         # API request handlers (auth, SMS)
│   │   ├── authController.js
│   │   └── smsController.js
│   ├── models/              # MongoDB models (User schema)
│   │   └── User.js
│   ├── routes/              # API routes
│   │   ├── authRoutes.js
│   │   └── smsRoutes.js
│   ├── utils/               # Utility functions (OTP generator, Twilio SMS)
│   │   ├── otpGenerator.js
│   │   ├── sendOtp.js
│   │   └── twilioSms.js
│   └── app.js               # Main server file
├── frontend/                # Frontend client files (React)
│   ├── src/                 # Source files for React app
│   │   ├── components/      # React components (UI elements)
│   │   └── pages/           # React pages (App layout and routes)
│   ├── index.html           # Main HTML file
│   └── vite.config.js       # Vite configuration for React
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies for both frontend and backend
├── README.md                # Project documentation (this file)
└── ...                      # Other configuration files (package-lock.json, etc.)
```

## **Getting Started**

**Prerequisites**

To run the project locally, you'll need the following:

- Node.js and npm or yarn

- MongoDB for the database

- Twilio account for SMS OTP functionality

- Google Cloud API key for Maps and Places APIs

## **Installation**

1. Clone the repository:

   ```
   git clone https://github.com/pavitrapai10/meet_in_middle.git
   cd meet_in_middle
   ```

2. Install backend dependencies:

   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```
   cd frontend
   npm install
   ```

4. Environment variables: Create a .env file in the backend directory and add the following environment variables:

   ```
   MONGO_URI=your_mongodb_connection_string
   TWILIO_ACCOUNT_SID = your_twilio_account_sid 
   TWILIO_AUTH_TOKEN = your_twilio_auth_token
   TWILIO_PHONE_NO = phone number used to create twilio account
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_api_key
   ```

5. Running the Application
   

   1. Start the backend server:
      
      

   ```
   cd backend
   node app.js
   ```

   2. Start the frontend server:
      
      
   
   ```
   cd frontend
   npm run dev
   ```
   
   3. Open the app: Visit http://localhost:5173/ in your browser to interact with the application.








