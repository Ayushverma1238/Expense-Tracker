import React, { useContext, useState } from "react";
import Auth_layout from "../../components/layouts/Auth_layout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext.jsx";
import {Helmet} from 'react-helmet-async'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {updateUser} = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter valid email");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // Login api logic

    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response?.data?.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }

      toast("User Login successfull", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("User login error", error);
      if (error.response || error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <>
    <Helmet>
        <title>Login | Expense Tracker</title>
      </Helmet>
    <Auth_layout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-1.25">
          Please enter your details to log in
        </p>

        <form className="mt-5" onSubmit={handleLogin}>
          <Input
            type="email"
            value={email}
            onChange={(target) => setEmail(target)}
            label="Email Address"
            placeholder="welcome@gmail.com"
          />
          <Input
            type="password"
            value={password}
            onChange={(target) => setPassword(target)}
            label="Password"
            placeholder="Min 8 charaters"
          />
          {error && <p className="text-xs my-2 text-red-500">{error}</p>}

          <button
            type="submit"
            className="px-3 py-2 w-full hover:shadow-lg hover:shadow-gray-800/30 rounded-xl hover:from-cyan-500 hover:to-purple-600 transition-all duration-200 text-white text-center bg-linear-to-br from-purple-700 to-cyan-500 font-semibold "
          >
            LOGIN
          </button>
          <p className="text-sm my-2 font-semibold">
            Don't have a account?{" "}
            <Link className="text-blue-600 hover:underline" to="/signUp">
              Registe Now
            </Link>
          </p>
        </form>
      </div>
    </Auth_layout>
    </>
  );
};

export default Login;
