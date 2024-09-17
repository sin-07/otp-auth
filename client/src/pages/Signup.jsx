import React, { useState } from "react";
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/signup", {
      email,
      password,
    });
    const data = await res.data;
    toast.success(data.message);
  };

  return (
    <>
    <Toaster/>
      <div>
        <form action="" onSubmit={handleSignup}>
          <h1>Create your Account</h1>
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
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <span>or</span>
            <span>Log in with existing Account</span>
          </div>
          <div>
            <button type="submit">SignUp</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
