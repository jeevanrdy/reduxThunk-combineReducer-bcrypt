import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // validateToken();
    }
  }, []);

  // let validateToken = async () => {
  //   let dataToSend = new FormData();
  //   dataToSend.append("token", localStorage.getItem("token"));
  //   let reqOptions = {
  //     method: "POST",
  //     body: dataToSend,
  //   };
  //   let JSONData = await fetch(
  //     "http://localhost:4444/validateToken",
  //     reqOptions
  //   );
  //   let JSOData = await JSONData.json();
  //   // console.log(JSOData);
  //   if (JSOData.status === "success") {
  //     dispatch({ type: "login", data: JSOData.data });
  //     navigate("/dashboard");
  //   } else {
  //     alert(JSOData.msg);
  //   }
  // };

  // let validateLogin = async () => {
  //   let dataToSend = new FormData();
  //   dataToSend.append("email", emailInputRef.current.value);
  //   dataToSend.append("password", passwordInputRef.current.value);
  //   let reqOptions = {
  //     method: "POST",
  //     body: dataToSend,
  //   };
  //   let JSONData = await fetch("http://localhost:4444/login", reqOptions);
  //   let JSOData = await JSONData.json();
  //   if (JSOData.status === "success") {
  //     localStorage.setItem("token", JSOData.data.token);
  //     dispatch({ type: "login", data: JSOData.data });
  //     navigate("/dashboard");
  //   } else {
  //     alert(JSOData.msg);
  //   }
  //   // console.log(JSOData);
  // };

  let validateLogin2 = () => {
    return async () => {
      let dataToSend = new FormData();
      dataToSend.append("email", emailInputRef.current.value);
      dataToSend.append("password", passwordInputRef.current.value);
      let reqOptions = {
        method: "POST",
        body: dataToSend,
      };
      let JSONData = await fetch("http://localhost:4444/login", reqOptions);
      let JSOData = await JSONData.json();
      if (JSOData.status === "success") {
        localStorage.setItem("token", JSOData.data.token);
        dispatch({ type: "login", data: JSOData.data });
        navigate("/dashboard");
      } else {
        alert(JSOData.msg);
      }
    };
  };

  return (
    <div className="App">
      <form>
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input ref={emailInputRef} placeholder="pawan@gmail.com"></input>
        </div>
        <div>
          <label>Password:</label>
          <input ref={passwordInputRef} placeholder="pspk"></input>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              dispatch(validateLogin2());
            }}
          >
            Login
          </button>
        </div>
      </form>
      <br></br>
      <br></br>
      <Link to="/signup">SignUp</Link>
    </div>
  );
}

export default Login;
