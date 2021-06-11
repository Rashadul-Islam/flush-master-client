//imported file list
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework=()=>{
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }else {
        firebase.app();
      }
}

const setUserToken=()=>{
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    sessionStorage.setItem('token', idToken);
    
  }).catch(function(error) {
    
  });
}

//goggle login process
export const handleGoogleSignIn=()=>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(googleProvider)
    .then(res=>{
      const {displayName,email,photoURL}=res.user;
      const signedInUser={
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL,
        success:true,
        error:''
      }
      return signedInUser;
      
    })
    .catch(error=>{
        const newUserInfo={};
        newUserInfo.error=error.message;
        newUserInfo.success=false;
        return newUserInfo;
    })
  }
  //user create process
  export const createUserWithEmailAndPassword=(name,email,password)=>{
   return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      
      const newUserInfo=res.user;
      newUserInfo.error='';
      newUserInfo.success=true;
      updateUserName(name);
      sessionStorage.setItem('userName', name);
      setUserToken();
      return newUserInfo;
    })
    .catch(error => {
      const newUserInfo={};
      newUserInfo.error=error.message;
      newUserInfo.success=false;
      return newUserInfo;
      
    });
  }
  // existing user login process
  export const signInWithEmailAndPassword=(email, password)=>{
   return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
   
      const newUserInfo=res.user;

      newUserInfo.error='';
      newUserInfo.success=true;
      setUserToken();
      return newUserInfo;
      
    })
    .catch((error) => {
      const newUserInfo={};
      newUserInfo.error=error.message;
      newUserInfo.success=false;
      return newUserInfo;
    });
  }
  //user update process
  const updateUserName=name=>{
    const user = firebase.auth().currentUser;
     
    user.updateProfile({
       displayName:name,
      
    }).then(function() {
      
    }).catch(function(error) {
      
    });
}