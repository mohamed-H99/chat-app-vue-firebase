import firebase from "firebase/app";
import store from "../firebase";

// firestore Refs
const messagesRef = store.db.collection("messages");

// fun[0] adding message
export const addMessage = (value) => {
  return messagesRef.add({
    text: value,
    author_id: store.auth.currentUser.uid,
    author: store.auth.currentUser.displayName,
    avatar_url: store.auth.currentUser.photoURL,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

// fun[1] deleting message
export const deleteMessage = (id) => {
  return messagesRef.doc(id).delete();
};

// fun[2] editing message
export const editMessage = (id, newData) => {
  return messagesRef.doc(id).update(newData);
};

export default {
  messagesRef,
};
