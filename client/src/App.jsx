import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Forgot from "./pages/Forgot";
import Verify from "./pages/Verify";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
