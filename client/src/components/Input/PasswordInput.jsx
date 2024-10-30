import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="input-group mb-3">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="form-control"
      />

      <div className="input-group-append">
        <span
          className="input-group-text cursor-pointer"
          onClick={toggleShowPassword}
        >
          {isShowPassword ? (
            <FaRegEye size={22} className="text-primary" />
          ) : (
            <FaRegEyeSlash size={22} className="text-secondary" />
          )}
        </span>
      </div>
    </div>
  );
};

export default PasswordInput;
