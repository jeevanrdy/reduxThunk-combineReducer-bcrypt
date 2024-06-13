import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let profilePicRef = useRef();
  let navigate = useNavigate();

  let [profilePic, setProfilePic] = useState("./images/noimage.png");

  let onSignUpUsingFormData = async () => {
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
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:4444/register", reqOptions);
    let JSOData = await JSONData.json();
    if (JSOData === "success") {
      alert(JSOData.msg);
      navigate("/");
    }
    // console.log(JSOData);
  };

  return (
    <div className="App">
      <form>
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
          <input ref={emailInputRef}></input>
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
              onSignUpUsingFormData();
            }}
          >
            SignUp
          </button>
        </div>
      </form>
      <br></br>
      <br></br>
      <Link to="/">Login</Link>
    </div>
  );
}

export default Signup;
