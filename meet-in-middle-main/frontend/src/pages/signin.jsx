import React, { useState, useEffect } from 'react';
import './signin.css';
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";
//

const Signin = () => {
    const [formData, setformData ] = useState({email: "", password: ""})
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setformData({...formData, [e.target.name] : e.target.value})
    }
    const handleSignin = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();
                if(response.status === 200) {
                    localStorage.setItem("token", data.token); 
                    alert(data.message);
                    navigate('/home', {state:{ email: formData.email}});
                    }
                    else{
                        alert(data.message);
                    }
                    }
                    catch(error) {
                        console.error(error)

                };
    };

    return (
        <div className="Signup-main">
            <div className="Signup-container">
                {/* Left section: Logo and Image */}
                <div className="Signup-logo">
            <img src={logo} alt="MeetHub Logo" />
        </div>
        <div className="Signup-text">
            MeetHub Midway meetings, anytime, anywhere
        </div>
                {/* Signup form */}
                <div className="Signup-form">
                    <h2>Sign In</h2>
                    <form onSubmit={handleSignin}>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                        />
                        <input
                            type="number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                        />
                         <p>
                    Don't have an account? <a href="/signup">Sign Up</a>
                        </p>
                        <button type="submit">Sign In </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signin;