import React, { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // Sign up API
    try {
      const res = await axios.post(
        "https://api-note-app.vercel.app/api/auth/signup",
        { username: name, email, password },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      setError("");

      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="border rounded bg-white p-4">
          <form onSubmit={handleSignUp}>
            <h4 className="text-center mb-4">Sign Up</h4>

            <div className="mb-3">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
              SIGN UP
            </button>

            <p className="small text-center mt-3">
              Already have an account?{" "}
              <Link to={"/login"} className="font-weight-bold text-primary">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
