import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default (() => {
  const firebaseConfig = {
    apiKey: "AIzaSyBRWxJBX1pm4o30Un-OyXwnEgWz-JyIw58",
    authDomain: "waterme-55931.firebaseapp.com",
    databaseURL: "https://waterme-55931.firebaseio.com",
    projectId: "waterme-55931",
    storageBucket: "waterme-55931.appspot.com",
    messagingSenderId: "497975740241",
    appId: "1:497975740241:web:d9a98bd2e0557491483570"
  };

  return firebase.initializeApp(firebaseConfig);
})();
