import firebase from "firebase/app"
import "firebase/auth"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNJlccK8LXC_ZlhU4jntbg4Eh7tlds7dw",
    authDomain: "drewshop-reactjs.firebaseapp.com",
    databaseURL: "https://drewshop-reactjs-default-rtdb.firebaseio.com",
    projectId: "drewshop-reactjs",
    storageBucket: "drewshop-reactjs.appspot.com",
    messagingSenderId: "528362187463",
    appId: "1:528362187463:web:f49e88623cdc0cef40ace2",
    measurementId: "G-LELMVL17VL"
  };

  export const myFirebase = firebase.initializeApp(firebaseConfig)
const baseDb = myFirebase.firestore()
export const db = baseDb
export default firebaseConfig
