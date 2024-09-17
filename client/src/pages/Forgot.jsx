import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

    const handleForgot = async (e) => {
     try {
        e.preventDefault();
        const res = await axios.post("http://localhost:5000/api/forgot", {
          email,
        });
        const data = await res.data;
        toast.success(data.message);
        navigate("/verify");
     } catch (error) {
        toast.error('User not found');
     }
    };


  return (
    <>
      <Toaster />
      <div>
        <form action="" onSubmit={handleForgot}>
          <h1>forgot page</h1>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <span>or</span>
            <Link to="/forgot">Forgot</Link>
          </div>
          <div>
            <button type="submit">Send otp</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Forgot;
