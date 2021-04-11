import firebase from "firebase/app";
import store from "../firebase";

const { auth } = store;

// fun[0] signup with email and password
export const signUpWithEmailAndPassword = (data) => {
  const { email, password } = data;
  return auth.createUserWithEmailAndPassword(email, password);
};

// fun[1] login with email and password
export const loginWithEmailAndPassword = (data) => {
  const { email, password } = data;
  return auth.signInWithEmailAndPassword(email, password);
};

// fun[2] OAuth(Google)
export const authWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.useDeviceLanguage();
  return auth.signInWithPopup(provider);
};

// fun[3] send email verification
export const emailVerification = () => {
  const user = auth.currentUser;
  return user.sendEmailVerification();
};

export const updateUserProfile = ({ displayName, photoURL }) => {
  var user = firebase.auth().currentUser;
  if (displayName && photoURL) {
    return user.updateProfile({ displayName, photoURL });
  } else if (displayName) {
    return user.updateProfile({ displayName });
  } else if (photoURL) {
    return user.updateProfile({ photoURL });
  } else {
    throw Error("Not given new data to update?");
  }
};

// fun[4] reset email address
export const resetEmail = (newEmail) => {
  const user = auth.currentUser;
  return user.updateEmail(newEmail);
};

// fun[5] reset user's password
export const resetPassword = (email) => {
  if (email) {
    return auth.sendPasswordResetEmail(email);
  } else {
    throw Error("Email field is empty!");
  }
};

export { auth };
