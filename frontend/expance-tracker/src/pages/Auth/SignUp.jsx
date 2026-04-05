import React, { useContext, useState } from "react";
import Auth_layout from "../../components/layouts/Auth_layout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { UserContext } from "../../context/UserContext.jsx";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName) {
      setError("Please enter your name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 8) {
      setError("Password at least 8 charaters");
      return;
    }
    setError("");

    // API logic
    try {
      const formData = new FormData();

      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profileImage", profilePic); // 👈 file only

      const response = await axiosInstance.post(
        API_PATH.AUTH.REGISTER,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const { token, user } = response.data.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/login");
      }
      // console.log("User", user);

      toast("User Register Successfull", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <Auth_layout>
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-600 mt-1.25 mb-6">
          Join us today by entering your details below.
        </p>
        <form onSubmit={handleSubmit}>
          <ProfilePhotoSelector
            image={profilePic}
            setProfilePic={setProfilePic}
          />
          <div className="grid grid-cols-1 transition-all duration-200 ease-in lg:grid-cols-2 gap-4">
            <Input
              value={fullName}
              placeholder="John"
              onChange={(target) => setFullName(target)}
              label="Full Name"
              type="text"
            />
            <Input
              type="email"
              value={email}
              onChange={(target) => setEmail(target)}
              label="Email Address"
              placeholder="welcome@gmail.com"
            />
            <div className="lg:col-span-2">
              <Input
                type="password"
                value={password}
                onChange={(target) => setPassword(target)}
                label="Password"
                placeholder="Min 8 charaters"
              />
            </div>
          </div>

          {error && <p className="text-xs my-2 text-red-500">{error}</p>}

          <button
            type="submit"
            className="px-3 py-2 w-full hover:shadow-lg hover:shadow-gray-800/30 rounded-xl hover:from-cyan-500 hover:to-purple-600 transition-all duration-200 text-white text-center bg-linear-to-br from-purple-700 to-cyan-500 font-semibold "
          >
            SIGN UP
          </button>
          <p className="text-sm my-2 font-semibold">
            Already have an account?{" "}
            <Link className="text-blue-600 hover:underline" to="/login">
              Login Here
            </Link>
          </p>
        </form>
      </div>
    </Auth_layout>
  );
};

export default SignUp;
