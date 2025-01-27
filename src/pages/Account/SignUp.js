import React, { useState, useCallback } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { postFetchData } from "../../api/Api";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [hide, setHide] = useState(false);

  const navigate = useNavigate();

  const handleEmail = useCallback((e) => {
    setEmail(e.target.value);
    setErrEmail("");
  }, []);

  const handlePassword = useCallback((e) => {
    setPassword(e.target.value);
    setErrPassword("");
  }, []);

  const validateEmail = useCallback((email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  }, []);

  const handleSignUp = useCallback(
    async (e) => {
      e.preventDefault();
      setHide(true);

      if (checked) {
        let valid = true;

        if (!email) {
          setErrEmail("Enter your email");
          valid = false;
        } else if (!validateEmail(email)) {
          setErrEmail("Enter a valid email");
          valid = false;
        }

        if (!password) {
          setErrPassword("Create a password");
          valid = false;
        } else if (password.length < 6) {
          setErrPassword("Passwords must be at least 6 characters");
          valid = false;
        }

        if (valid) {
          try {
            const res = await postFetchData(
              `${process.env.REACT_APP_API_BASE_URL}/user/register`,
              { email, password, seller: `${process.env.REACT_APP_SHOP_NAME}` }
            );

            if (
              res.status === "success" &&
              res.message === "OTP updated and sent to your email."
            ) {
              setEmail("");
              setPassword("");
              localStorage.setItem("emaill", email); // Store email in localStorage only once
              navigate("/verify-signup");
            } else {
              alert(res?.message);
            }
          } catch (error) {
            console.error("Error during signup:", error);
          }
        }

        setHide(false);
      } else {
        setHide(false);
      }
    },
    [email, password, checked, validateEmail, navigate]
  );

  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            {/* <img src={logoLight} alt="logoImg" className="w-28" /> */}
            <div style={{ fontSize: "40px", fontWeight: "bold" }}>
              {/* <Image className="w-20 object-cover" imgSrc={logo} /> */}
              GIT
            </div>
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
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
          <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
              Create your account
            </h1>
            <div className="flex flex-col gap-3">
              {/* Email */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Email
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="email"
                  placeholder="john@workemail.com"
                />
                {errEmail && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errEmail}
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
                  value={password}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="password"
                  placeholder="Create password"
                />
                {errPassword && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errPassword}
                  </p>
                )}
              </div>

              {/* Checkbox */}
              <div className="flex items-start mdl:items-center gap-2">
                <input
                  onChange={() => setChecked(!checked)}
                  className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                  type="checkbox"
                />
                <p className="text-sm text-primeColor">
                  I agree to the OREBI{" "}
                  <span className="text-blue-500">Terms of Service </span>and{" "}
                  <span className="text-blue-500">Privacy Policy</span>.
                </p>
              </div>
              <button
                onClick={handleSignUp}
                className={`${
                  checked
                    ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                    : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                disabled={hide ? true : false}
              >
                {hide ? "please wait..." : "Create Account"}
              </button>
              <p className="text-sm text-center font-titleFont font-medium">
                Don't have an Account?{" "}
                <Link to="/signin">
                  <span className="hover:text-blue-600 duration-300">
                    Sign in
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

export default React.memo(SignUp);
