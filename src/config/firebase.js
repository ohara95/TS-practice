import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBu-Pu6Ll5Jtq4-Zi8yRTjYiXBxAdyQwVY",
  authDomain: "test-9fc4e.firebaseapp.com",
  databaseURL: "https://test-9fc4e.firebaseio.com",
  projectId: "test-9fc4e",
  storageBucket: "test-9fc4e.appspot.com",
  messagingSenderId: "190521712843",
  appId: "1:190521712843:web:98c836cb10d1997f6abb4e",
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export default firebase;
