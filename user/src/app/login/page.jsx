'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import './login.css';

export default function LoginPage() {
  const [step, setStep] = useState(1); 
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');

  const router = useRouter();

  const handleSendOTP = () => {
    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setStep(2);
  };

  const handleVerifyOTP = () => {
  if (otp.length === 6) {
    localStorage.setItem("isLoggedIn", "true");

    router.push("/dashboard");
  } else {
    alert("Enter valid OTP");
  }
};

  return (
    <div className="login-wrapper">
      
      <div className="login-card">
        <h2>User Login</h2>
        <p className="subtitle">Login using your mobile number</p>

        {step === 1 && (
          <div className="form-step">
            <label>Mobile Number</label>
            <input
              type="tel"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter 10-digit mobile number"
            />

            <button 
              className="primary-btn"
              onClick={handleSendOTP}
            >
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <label>Enter OTP</label>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
            />

            <button 
              className="primary-btn"
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </button>

            <button
              className="secondary-btn"
              onClick={() => setStep(1)}
            >
              ← Change Mobile Number
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
