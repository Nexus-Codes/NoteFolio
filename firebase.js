
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5waNYtvmuw7UnmHoXSMeH5M_34oKrDZo",
    authDomain: "fir-login-5c5e0.firebaseapp.com",
    projectId: "fir-login-5c5e0",
    storageBucket: "fir-login-5c5e0.appspot.com",
    messagingSenderId: "574480072693",
    appId: "1:574480072693:web:847821173d4d6e4048eabc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
    getDatabase,
    ref,
    set,
    child,
    update,
    remove,
    get
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const db = getDatabase();

function checkValueValidation() {

    const username = document.getElementById('username-box').value;
    const password = document.getElementById('pass-box').value;

    if (document.getElementById('username-box').value.length < 3 || document.getElementById('pass-box').value.length < 3) {
        alert('Username and password must be at least 3 characters long.');
    }
    else if(!document.getElementById('checkboxx').checked) {
        alert('Please accept the terms and conditions.')
    }
    const userRef = ref(db, `Accounts/${username}`);
    
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            alert('Username already exists. Please choose a different username.');
        }
        else{
            set(userRef, {
                Username: username,
                Password: password
            })
            .then(() => {
                alert('Account Created created sucessfully!');
            })
            .catch(() => {
                alert('Failed to check username availability.');
            });
        }
    })

}
document.getElementById('login').addEventListener('click', checkValueValidation);



