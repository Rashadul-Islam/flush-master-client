import React, { useContext, useEffect, useState } from 'react';

import { UserContext, UserContext2 } from '../../App';
import { useHistory, useLocation } from 'react-router';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import "./Login.css";


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}



const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    success: false,
    photo: ''
  })
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const googleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          success: true,
          photo: photoURL
        }
        setUser(signedInUser);
        //   setLoggedInUser(signedInUser)
        storeAuthToken(signedInUser);
        //   sessionStorage.setItem('userName', signedInUser.name);
      })
      .catch(error => {
        const newUserInfo = { ...user };
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
        console.log(error.message);
      })
  }

  const storeAuthToken = (signedInUser) => {

    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {

        const newSignedInUser = { ...signedInUser };
        newSignedInUser.token = idToken;
        setLoggedInUser(newSignedInUser)
        sessionStorage.setItem('token', idToken);
        sessionStorage.setItem('userName', newSignedInUser.name);
        sessionStorage.setItem('userEmail', newSignedInUser.email);
        history.replace(from);
      }).catch(function (error) {
        // Handle error
      });
  }


  return (
    <div className="d-flex justify-content-center">
      <div id="login-card" className="card align-items-center" >
        <h5 className="mt-4">Login</h5>
        <p>Please confirm your login status</p>
        <button className="google-login text-center" onClick={googleSignIn} type="submit"><FontAwesomeIcon icon={faGoogle} />  Continue with google</button>
        <p style={{ color: 'red' }}>{user.error}</p>
      </div>
    </div>
  );
};

export default Login;