import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/verify", {
      otp,
      password,
    });
    const data = await res.data;
    toast.success(data.message);
    navigate("/login");
  };

  return (
    <>
      <Toaster />
      <div>
        <form action="" onSubmit={handleVerify}>
          <h1>otp verification page</h1>
          <div>
            <label htmlFor="otp">Otp</label>
            <input
              type="otp"
              name="otp"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button type="submit">verify otp</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Verify;
