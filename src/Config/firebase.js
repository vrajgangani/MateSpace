// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL-tfn3P_s8R5VS9HP1p2SOBIatdPUIpw",
  authDomain: "chat-application-9f7d0.firebaseapp.com",
  projectId: "chat-application-9f7d0",
  storageBucket: "chat-application-9f7d0.appspot.com",
  messagingSenderId: "964465180553",
  appId: "1:964465180553:web:3c16a461d612e132a3eb58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Cloud Firestore and get a reference to the service
export default db; 