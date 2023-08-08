import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCNE0oHf4-uR5jqzoNeVN7sFvMZ53KGwT8",
    authDomain: "login-b3cdf.firebaseapp.com",
    projectId: "login-b3cdf",
    storageBucket: "login-b3cdf.appspot.com",
    messagingSenderId: "464377817951",
    appId: "1:464377817951:web:9d905672949ad3bd17e4ea"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);