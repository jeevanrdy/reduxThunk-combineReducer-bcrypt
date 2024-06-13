import React, { useEffect, useRef, useState } from "react";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function EditProfile() {
  let navigate = useNavigate();

  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let profilePicRef = useRef();

  let storeObj = useSelector((store) => {
    return store;
  });

  useEffect(() => {
    firstNameInputRef.current.value = storeObj.reducer.userDetails.firstName;
    lastNameInputRef.current.value = storeObj.reducer.userDetails.lastName;
    ageInputRef.current.value = storeObj.reducer.userDetails.age;
    emailInputRef.current.value = storeObj.reducer.userDetails.email;
    setProfilePic(`http://localhost:4444/${storeObj.reducer.userDetails.profilePic}`);
  }, []);
  useEffect(() => {}, []);

  let [profilePic, setProfilePic] = useState("./images/noimage.png");

  let UpdateProfile = async () => {
    let dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    for (let i = 0; i < profilePicRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicRef.current.files[i]);
    }

    let reqOptions = {
      method: "PUT",
      body: dataToSend,
    };

    let JSONData = await fetch(
      "http://localhost:4444/updateUserDetails",
      reqOptions
    );
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    if (JSOData.status === "success") {
      navigate("/dashboard");
      
    }
    // console.log(JSOData);
  };

  return (
    <div className="editprofilestyle">
      <TopNavigation />
      <form>
        <h2>EditProfile</h2>
        <div>
          <label>FirstName:</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>LastName:</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Age:</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email:</label>
          <input ref={emailInputRef} readOnly></input>
        </div>
        <div>
          <label>Password:</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label id="ppl">ProfilePicture: </label>
          <input
            id="picbutton"
            ref={profilePicRef}
            type="file"
            accept="image/*"
            onChange={(evtObj) => {
              let selectedPicPath = URL.createObjectURL(evtObj.target.files[0]);
              setProfilePic(selectedPicPath);
            }}
          ></input>
          <br></br>
          <br></br>
          <img
            className="PicPreview"
            src={profilePic}
            alt="profilepicture"
          ></img>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              UpdateProfile();
            }}
          >
            UpdateProfile
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
