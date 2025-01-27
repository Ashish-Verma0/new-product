import React, { useState, useCallback } from "react";
import { postFetchData } from "../../api/Api";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleVerify = useCallback(
    async (e) => {
      e.preventDefault();
      if (isSubmitting) return;

      setIsSubmitting(true);
      try {
        const res = await postFetchData(
          `${process.env.REACT_APP_API_BASE_URL}/user/reset-request`,
          { email, seller: process.env.REACT_APP_SHOP_NAME }
        );

        if (res.status === "success") {
          alert(res.message);
          localStorage.setItem("email", email);
          navigate("/otp");
        } else {
          alert(res.message);
        }
      } catch (error) {
        console.error("Error during verification:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, isSubmitting, navigate]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 w-full max-w-md sm:mx-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 mt-2">
          We’ve sent a verification code to your email. Please enter it below to
          verify your email.
        </p>
        <form className="mt-6" onSubmit={handleVerify}>
          <div className="mb-4">
            <label
              htmlFor="verificationCode"
              className="block text-gray-700 font-medium"
            >
              Verification Email
            </label>
            <input
              type="text"
              id="verificationCode"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Please wait..." : "Verify Email"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Didn’t receive the code?{" "}
          <button
            className="text-blue-600 font-medium hover:underline"
            onClick={handleVerify}
            disabled={isSubmitting}
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default React.memo(VerifyEmail);
