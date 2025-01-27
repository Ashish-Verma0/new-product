import React, { useState, useCallback } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { postFetchData } from "../../api/Api";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [hide, setHide] = useState(false);

  const navigate = useNavigate();

  const handleEmail = useCallback((e) => {
    setFormData((prevData) => ({ ...prevData, email: e.target.value }));
    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
  }, []);

  const handlePassword = useCallback((e) => {
    setFormData((prevData) => ({ ...prevData, password: e.target.value }));
    setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
  }, []);

  const handleSignUp = useCallback(
    async (e) => {
      e.preventDefault();
      setHide(true);

      const { email, password } = formData;

      if (!email) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Enter your email",
        }));
        setHide(false);
        return;
      }

      if (!password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Create a password",
        }));
        setHide(false);
        return;
      }

      try {
        const res = await postFetchData(
          `${process.env.REACT_APP_API_BASE_URL}/user/login`,
          { email, password }
        );

        if (res.status === "success") {
          localStorage.setItem("token", res.data);
          localStorage.setItem("email", email);
          navigate("/");
          window.location.reload();
        } else {
          alert(res.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
      setHide(false);
    },
    [formData, navigate]
  );

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Welcome to Global InfoTech
            </h1>
            <p className="text-base">
              Empowering businesses with cutting-edge technology solutions!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Comprehensive IT Solutions
              </span>
              <br />
              From software development to cloud integration, we provide
              end-to-end solutions tailored to your needs.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Expertise in Emerging Technologies
              </span>
              <br />
              We specialize in AI, IoT, blockchain, and data analytics to drive
              innovation for your business.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by Global Clients
              </span>
              <br />
              With a proven track record, we are trusted by businesses worldwide
              to deliver exceptional results.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <Link to="/">
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                © Global InfoTech
              </p>
            </Link>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-1/2 h-full">
        <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
          <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
              Sign in
            </h1>
            <div className="flex flex-col gap-3">
              {/* Email */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Email
                </p>
                <input
                  onChange={handleEmail}
                  value={formData.email}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="email"
                  placeholder="john@workemail.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Password
                </p>
                <input
                  onChange={handlePassword}
                  value={formData.password}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="password"
                  placeholder="Create password"
                />
                {errors.password && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                onClick={handleSignUp}
                className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
                disabled={hide}
              >
                {hide ? "please wait..." : "Sign In"}
              </button>
              <p className="text-sm text-center font-titleFont font-medium">
                Forgot Password?{" "}
                <Link to="/verify-email">
                  <span className="hover:text-blue-600 duration-300">
                    Forgot
                  </span>
                </Link>
              </p>
              <p className="text-sm text-center font-titleFont font-medium">
                Don't have an Account?{" "}
                <Link to="/signup">
                  <span className="hover:text-blue-600 duration-300">
                    Sign up
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(SignIn);
