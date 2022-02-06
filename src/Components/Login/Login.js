//imported file list
import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  handleGoogleSignIn,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from "./LoginManager";

import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import firebase from "firebase/app";
import "firebase/auth";
import Navbar from "../Home/Navbar/Navbar";
import FooterEnd from "../Home/Footer/FooterEnd";
import Zoom from "react-reveal/Zoom";

function Login() {
  //setting default user object
  const [newUser, setNewUser] = useState(true);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });
  const [loginError, setLoginError] = useState("");
  //defining redirect location for private route
  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  //handling google sign in
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  //handle responsefor redirecting
  const handleResponse = (res, redirect) => {
    if (res.error === "") {
      let dName;
      if (res.name) {
        dName = res.name;

        setLoggedInUser(res);
      } else {
        if (res.displayName === null) {
          dName = user.name;

          setLoggedInUser(user);
        } else {
          dName = res.displayName;

          setLoggedInUser(res);
        }
      }
      const sessionData = {
        name: res.name || dName,
        email: res.email,
      };
      storeAuthToken(sessionData);
    }
  };
  //handling create account and login for existing user
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    } else if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        if (res.success === true) {
          handleResponse(res, true);
        } else {
          setLoginError("Invalid Credential...");
        }
      });
    } else {
      setLoginError("Invalid Credential...");
    }
  };

  //handling form validation
  const handleChange = (event) => {
    let isFieldValid = true;
    if (event.target.name === "email") {
      setLoginError("");
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      setLoginError("");
      const isPasswordvalid = event.target.value.length > 6;
      const isPassowrdHasNum = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordvalid && isPassowrdHasNum;
    }
    if (isFieldValid) {
      setLoginError("");
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  const storeAuthToken = (newSignedInUser) => {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        sessionStorage.setItem("token", idToken);
        sessionStorage.setItem("userName", newSignedInUser.name);
        sessionStorage.setItem("userEmail", newSignedInUser.email);
        history.replace(from);
      })
      .catch(function (error) {
        // Handle error
      });
  };

  //handling toogler for different user type
  const handleUserType = () => {
    setNewUser(!newUser);
    const newUserInfo = { ...user };
    newUserInfo.error = "";
    setUser(newUserInfo);
  };

  return (
    <div className="login_bg">
      <Navbar></Navbar>
      <div className="align_login">
        <Zoom top>
          <div className="d-flex justify-content-center">
            <div
              id="login-card"
              className="card shadow-lg"
              style={{ width: "20rem" }}
            >
              {newUser ? (
                <div>
                  <form id="myForm" onSubmit={handleSubmit}>
                    <h5>Create an account</h5>
                    <br />
                    <input
                      className="user-input"
                      type="text"
                      onChange={handleChange}
                      name="name"
                      placeholder="Name"
                      required
                    />
                    <br />
                    <input
                      className="user-input"
                      type="email"
                      onChange={handleChange}
                      name="email"
                      placeholder="Email"
                      required
                    />
                    <br />
                    <input
                      className="user-input"
                      type="password"
                      onChange={handleChange}
                      name="password"
                      placeholder="Password (greater than 6 character)"
                      required
                    />
                    <br />
                    <button id="user-submit" type="submit">
                      Create an account
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  <form id="myForm" onSubmit={handleSubmit}>
                    <h5>Login</h5>
                    <br />
                    <input
                      className="user-input"
                      type="email"
                      onChange={handleChange}
                      name="email"
                      placeholder="Email"
                      required
                    />
                    <br />
                    <input
                      className="user-input"
                      type="password"
                      onChange={handleChange}
                      name="password"
                      placeholder="Password (greater than 6 character)"
                      required
                    />
                    <br />
                    <button id="user-submit" type="submit">
                      Login
                    </button>
                  </form>
                </div>
              )}
              <br />
              {loginError ? <p style={{ color: "red" }}>{loginError}</p> : ""}
              {/* togllet for handling user type */}
              <p>
                {newUser ? "Already have an account?" : "New here?"}{" "}
                <span>
                  <input
                    type="submit"
                    className="handleButtonToggle"
                    onClick={handleUserType}
                    name="newUser"
                    value={newUser ? "Login" : "Create an account"}
                  />
                </span>{" "}
              </p>
            </div>
          </div>
        </Zoom>
        <div className="d-flex justify-content-center">
          <p id="optional-line">OR</p>
        </div>
        <Zoom bottom>
          <div className="d-flex justify-content-center">
            <button
              className="optional-login"
              onClick={googleSignIn}
              type="submit"
            >
              <FontAwesomeIcon icon={faGoogle} /> Continue with google
            </button>
          </div>
        </Zoom>
      </div>
      <div id="login-footer">
        <FooterEnd></FooterEnd>
      </div>
    </div>
  );
}

export default Login;
