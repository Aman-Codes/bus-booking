import React, { useState } from "react";
import { Form, message } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import { Helmet } from "react-helmet";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/auth/login", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        localStorage.setItem("user_id", response.data.user._id);

        const idTrip = localStorage.getItem("idTrip");

        if (response.data.user.isAdmin === true) {
          navigate("/admin/buses");
        } else if (idTrip == null) {
          navigate("/bookings");
        } else if (idTrip !== null) {
          navigate(`/book-now/${idTrip}`);
        }
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const TogglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Form onFinish={onFinish} className="h-screen flex">
        <div
          className="hidden lg:flex w-full lg:w-3/4"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("data:image/jpeg;base64,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")`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex items-center h-full w-full px-20 bg-gray-900 bg-opacity-40"></div>
        </div>
        <div className="green bg-gradient-to-r flex w-full lg:w-1/2 justify-center items-center space-y-8">
          <div className="w-3/4 px-8 md:px-32 lg:px-24">
            <div className="flex flex-col items-center mb-10">
              <Link
                to="/"
                className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 border-blue-600 rounded-full shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-600 group-hover:translate-x-0 ease">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-blue-600 transition-all duration-300 transform group-hover:translate-x-full ease">
                  Back
                </span>
                <span className="relative invisible">Button Text</span>
              </Link>
            </div>
            <h1 className="mb-8 text-5xl text-center font-bold italic">
              Login
            </h1>
            <Form.Item
              name="email"
              initialValue=""
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="email"
                  name="floating_email"
                  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-blue-500 dark:focus:border-blue-700 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
            </Form.Item>
            <Form.Item
              name="password"
              initialValue=""
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                  min: 6,
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type={passwordShown ? "text" : "password"}
                  name="floating_password"
                  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-blue-500 dark:focus:border-blue-700 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_password"
                  className="absolute text-sm text-gray-500 dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
                <i
                  className="absolute right-0 top-0 mt-3 mr-4 text-black cursor-pointer"
                  onClick={TogglePassword}
                >
                  {passwordShown ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </i>
              </div>
            </Form.Item>
            <div className="flex justify-center mb-5">
              <button
                type="submit"
                className="relative inline-flex items-center justify-start
                px-10 py-3 overflow-hidden font-bold rounded-full
                group"
              >
                <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-blue-600 opacity-100 group-hover:-translate-x-8"></span>
                <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">
                  Login
                </span>
                <span className="absolute inset-0 border-2 border-blue-600 rounded-full"></span>
              </button>
            </div>
            <p className="text-center text-base text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-bold hover:text-blue-700"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </Form>
    </>
  );
}

export default Login;
