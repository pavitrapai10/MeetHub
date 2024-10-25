import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Signup = () => {
    const [formData, setformData] = useState({ email: "", phoneNumber: "+91", password: "" }); // Default phone number with +91
    const [otp, setOtp] = useState("");
    const [isOtpFormVisible, setIsOtpFormVisible] = useState(false); // To toggle between Signup and OTP forms
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        // Append the correct phone format if not already there
        const formattedPhoneNumber = formData.phoneNumber.startsWith('+91')
            ? formData.phoneNumber
            : `+91${formData.phoneNumber}`; 

        const updatedFormData = {
            ...formData,
            phoneNumber: formattedPhoneNumber, // Ensure phone number is in the correct format
        };

        try {
            const response = await fetch('http://localhost:5001/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFormData), // Send updated form data with correct phone format
            });
            const data = await response.json();
            if (response.status === 201) {
                alert(data.message);
                setIsOtpFormVisible(true); // Show OTP form after signup success
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleOtpVerification = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/auth/verifyOtp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email, otp }), // Use email from formData
            });
            const data = await response.json();
            if (response.status === 200) {
                localStorage.setItem("token", data.token);
                alert(data.message);
                navigate('/home', { state: { email: formData.email } }); // Redirect to /home
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="Signup-main">
            <div className="Signup-container">
                {/* Logo Section */}
                <div className="Signup-logo">
                    <img src={logo} alt="MeetHub Logo" />
                </div>

                {/* Text Section */}
                <div className="Signup-text">
                    MeetHub Midway meetings, anytime, anywhere
                </div>

                {/* Conditional Rendering based on isOtpFormVisible */}
                {!isOtpFormVisible ? (
                    <div className="Signup-form">
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSignup}>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                required
                            />
                            <input
                                type="text" // Changed to "text" to allow the +91 prefix
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="Phone Number"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                required
                            />
                            <button type="submit">Signup</button>
                        </form>
                    </div>
                ) : (
                    <div className="Signup-form"> {/* Use same class for consistent styling */}
                        <h2>Verify OTP</h2>
                        <form onSubmit={handleOtpVerification}>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                required
                            />
                            <button type="submit">Verify OTP</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Signup;
