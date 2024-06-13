import React from "react";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  let navigate = useNavigate();
  let storeObj = useSelector((store) => {
    // console.log(store);
    return store;
  });

  let deleteAcc = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", storeObj.reducer.userDetails.email);
    let reqOptions = {
      method: "DELETE",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:4444/deleteAcc", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    if (JSOData.status === "success") {
      navigate("/");
    }
  };
  return (
    <div className="dashstyle">
      <TopNavigation />
      <div>
        <h2>Dashboard</h2>
        <h3>
          Welcome: {storeObj.reducer.userDetails.firstName}{" "}
          {storeObj.reducer.userDetails.lastName}
        </h3>
        <img
          alt="dashimage"
          src={`http://localhost:4444/${storeObj.reducer.userDetails.profilePic}`}
        ></img>
      </div>
      <button
        type="button"
        onClick={() => {
          deleteAcc();
        }}
      >
        Delete Account
      </button>
    </div>
  );
}

export default DashBoard;
