import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, placeholder, type, label }) => {
  const [showPassowrd, setShowPassowrd] = useState(false);
  const toggleShowPassword = () => {
    setShowPassowrd(!showPassowrd);
  };
  return (
    <div>
      <label className="text-[17px] text-slate-800 font-medium" htmlFor="">
        {label}
      </label>
      <div className="input-box hover:ring-2 hover:ring-gray-600">
        <input
          value={value}
          className="w-full bg-transparent  outline-none"
          onChange={(e) => onChange(e.target.value)}
          type={type === "password" ? (showPassowrd ? "text" : "password") : type}
          placeholder={placeholder}
        />
        {type === "password" && (
          <>
            {showPassowrd ? (
              <div>
                <FaRegEye size={22}
                onClick={toggleShowPassword}
                className="text-primary cursor-pointer"
                />
              </div>
            ) : (
              <div>
                <FaRegEyeSlash size={22}
                onClick={toggleShowPassword}
                className="text-slate-400 cursor-pointer" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
