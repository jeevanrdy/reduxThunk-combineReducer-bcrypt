import "./App.css";
import About from "./components/About";
import DashBoard from "./components/DashBoard";
import EditProfile from "./components/EditProfile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
        <Route path="/editprofile" element={<EditProfile />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
