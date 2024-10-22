import React from 'react'
import Signup from './pages/signup'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signin from './pages/signin';
import OtpVerification from './pages/otpVerification';
import Home from './pages/home';
import { useState } from 'react'
import InvitePage from './pages/invitePage';
import './App.css'

function App() {


  return (
   <Router > 
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Signin />} />
      <Route path="/otpVerification" element={<OtpVerification />} />
      <Route path="/home" element={<Home />} />
      <Route path="/invitepage" element={<InvitePage />} />
    </Routes>
   </Router>
  )
}

export default App
