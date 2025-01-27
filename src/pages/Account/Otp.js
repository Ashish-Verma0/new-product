import React, { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { postFetchData } from "../../api/Api";

const Otp = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef([]);
  const isSubmitting = useRef(false); // Prevent multiple submissions

  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  // Handle OTP input change
  const handleOtpChange = useCallback(
    (value, index) => {
      if (isNaN(value)) return;
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    },
    [otp]
  );

  // Handle backspace key navigation
  const handleOtpKeyDown = useCallback(
    (e, index) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        otpRefs.current[index - 1].focus();
      }
    },
    [otp]
  );

  // Handle OTP verification
  const handleVerify = useCallback(
    async (e) => {
      e.preventDefault();
      if (isSubmitting.current) return; // Prevent duplicate submissions
      isSubmitting.current = true;
      setLoading(true);

      try {
        const otpData = otp.join("");
        const res = await postFetchData(
          `${process.env.REACT_APP_API_BASE_URL}/user/reset-otp-verify`,
          { email, otp: otpData, seller: process.env.REACT_APP_SHOP_NAME }
        );

        if (res.status === "success") {
          alert(res.message);
          navigate("/reset-password/reset");
        } else {
          alert(res.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
        isSubmitting.current = false;
      }
    },
    [otp, email, navigate]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md sm:mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img src={logoLight} alt="Logo" className="w-24" />
          </Link>
        </div>
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Verify Your Account
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit code sent to your email {email} to verify your
          account.
        </p>
        {/* OTP Input */}
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (otpRefs.current[index] = el)}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              onKeyDown={(e) => handleOtpKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className={`w-full py-3 rounded-md font-semibold transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Verify OTP"}
        </button>
        {/* Footer */}
        <p className="text-center text-gray-600 mt-4">
          Back to verify?{" "}
          <button
            className="text-blue-600 font-medium hover:underline"
            onClick={() => navigate("/verify-email")}
          >
            Verify
          </button>
        </p>
        <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
          <p>© Globel Info Tech</p>
          <div className="flex gap-4">
            <p className="hover:text-blue-600 cursor-pointer">Terms</p>
            <p className="hover:text-blue-600 cursor-pointer">Privacy</p>
            <p className="hover:text-blue-600 cursor-pointer">Security</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Otp);
