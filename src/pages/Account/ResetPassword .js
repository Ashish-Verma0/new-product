import React, { useState, useCallback, useMemo } from "react";
import { postFetchData } from "../../api/Api";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const email = useMemo(() => localStorage.getItem("email"), []);
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const isPasswordsMatch = useMemo(
    () => data.password === data.confirmPassword,
    [data.password, data.confirmPassword]
  );

  const handleReset = useCallback(
    async (e) => {
      e.preventDefault();
      if (!isPasswordsMatch) {
        alert("Password and Confirm Password do not match.");
        return;
      }

      setIsLoading(true);
      try {
        const res = await postFetchData(
          `${process.env.REACT_APP_API_BASE_URL || ""}/user/update-password`,
          {
            email,
            seller: process.env.REACT_APP_SHOP_NAME || "defaultShop",
            password: data.password,
          }
        );

        if (res.status === "success") {
          alert(res.message);
          navigate("/signin");
        } else {
          alert(res.message);
        }
      } catch (error) {
        console.error("Error resetting password:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [data.password, email, isPasswordsMatch, navigate]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 w-full max-w-md sm:mx-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Reset Your Password
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Enter your new password below to reset it.
        </p>
        <form className="mt-6" onSubmit={handleReset}>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-gray-700 font-medium"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              name="password"
              onChange={handleChange}
              value={data.password}
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm new password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
              isLoading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Please wait...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(ResetPassword);
