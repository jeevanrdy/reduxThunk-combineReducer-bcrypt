import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function TopNavigation() {
  let navigate = useNavigate();
  let storeObj = useSelector((store) => {
    return store;
  });

  useEffect(() => {
    if (storeObj && storeObj.reducer.userDetails && storeObj.reducer.userDetails.email) {
    } else {
      navigate("/");
    }
  });

  let loggingOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  
  return (
    <nav>
      <Link to="/dashboard">DashBoard</Link>
      <Link to="/editprofile">EditProfile</Link>
      <Link to="/about">About</Link>
      <Link to="/" onClick={loggingOut}>
        Logout
      </Link>
    </nav>
  );
}

export default TopNavigation;
