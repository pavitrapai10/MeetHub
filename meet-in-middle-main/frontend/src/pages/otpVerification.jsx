import React, { useState, useEffect } from 'react';
import './otpVerification.css';
import {useNavigate, useLocation} from "react-router-dom";

const OtpVerification = () => {
    const [otp, setOtp ] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    // const email = location.state.email;

   
    const handleOtpVerification = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/verifyOtp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email,otp}),
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
        <div className="otpVerification-main">
            <h2>verifyOtp</h2>
            <form onSubmit = {handleOtpVerification}>
                <input
                type="text"
                value={otp}
                onChange = {(e)=>setOtp(e.target.value)}
                placeholder="OTP"
                required
                /> 
               
               
                <button type="Submit">
                    Verify OTP
                </button>
    
            </form>
          
        </div>
      );
    }
    
    export default OtpVerification;
