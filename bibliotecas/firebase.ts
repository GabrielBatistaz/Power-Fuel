// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFyOswpCtkM6dkuLm3PmU6iBR7itY9P4k",
  authDomain: "power-fuel-943bb.firebaseapp.com",
  projectId: "power-fuel-943bb",
  storageBucket: "power-fuel-943bb.appspot.com",
  messagingSenderId: "796162998716",
  appId: "1:796162998716:web:1c22d5b271f3a81f6cebb9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp