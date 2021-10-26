import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDIzrG2GpJZ5G0tR5umB4PPv7L2FRg0dnU",
	authDomain: "kkpedia-c06ed.firebaseapp.com",
	projectId: "kkpedia-c06ed",
	storageBucket: "kkpedia-c06ed.appspot.com",
	messagingSenderId: "492507730743",
	appId: "1:492507730743:web:3e70faa212d360f924c0b2",
	measurementId: "G-49ZN4XVS2L",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
