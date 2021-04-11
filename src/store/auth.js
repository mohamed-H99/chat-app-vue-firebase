import firebase from "firebase/app";
import store from "../firebase";

// fun[0] signup with email and password
export const signUpWithEmailAndPassword = (data) => {
  const { email, password } = data;
  return store.auth.createUserWithEmailAndPassword(email, password);
};

// fun[1] login with email and password
export const loginWithEmailAndPassword = (data) => {
  const { email, password } = data;
  return store.auth.signInWithEmailAndPassword(email, password);
};

// fun[2] OAuth(Google)
export const authWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  store.auth.useDeviceLanguage();
  return store.auth.signInWithPopup(provider);
};

// fun[3] send email verification
export const emailVerification = () => {
  const user = store.auth.currentUser;
  return user.sendEmailVerification();
};

export const updateUserProfile = ({ displayName, photoURL }) => {
  var user = firebase.auth().currentUser;
  return user.updateProfile({ displayName, photoURL });
};

// fun[4] reset email address
export const resetEmail = (newEmail) => {
  const user = store.auth.currentUser;
  return user.updateEmail(newEmail);
};

// fun[5] reset user's password
export const resetPassword = (email) => {
  if (email) {
    return store.auth.sendPasswordResetEmail(email);
  } else {
    throw Error("Email field is empty!");
  }
};

export default {
  auth: store.auth
};
