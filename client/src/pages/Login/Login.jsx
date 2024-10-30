import React, { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // Login API
    try {
      dispatch(signInStart());

      const res = await axios.post(
        "https://api-note-app.vercel.app/api/auth/signin",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        console.log(res.data);
        dispatch(signInFailure(res.data.message));
      }

      toast.success(res.data.message);
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="border rounded bg-white p-4">
          <form onSubmit={handleLogin}>
            <h4 className="text-center mb-4">Login</h4>

            <div className="mb-3">
              <input
                type="text"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-danger small pb-1">{error}</p>}

            <button type="submit" className="btn btn-primary w-100 text-white">
              LOGIN
            </button>

            <p className="small text-center mt-3">
              Not registered yet?{" "}
              <Link to={"/signup"} className="font-weight-bold text-primary">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
