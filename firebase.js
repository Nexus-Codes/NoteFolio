
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
        document.getElementById('invalid-down').innerHTML = 'Username and Password must be atleast 3 characters long';
        document.getElementById('invalid-top').style.display = 'none';
        document.getElementById('invalid-container').style.display = 'flex';
        return;
    }
    else if(!document.getElementById('checkboxx').checked) {
        document.getElementById('invalid-down').innerHTML = 'Please accept the terms and conditions';
        document.getElementById('invalid-top').style.display = 'none';
        document.getElementById('invalid-container').style.display = 'flex';
        return;
    }
    const userRef = ref(db, `Accounts/${username}`);
    
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            document.getElementById('invalid-down').innerHTML = 'Username already exist. Choose a different username';
            document.getElementById('invalid-top').style.display = 'none';
            document.getElementById('invalid-container').style.display = 'flex';
        }
        else if (document.getElementById('pass-box').value.length > 3){
            set(userRef, {
                Username: username,
                Password: password
            })
            .then(() => {
        document.getElementById('invalid-container').style.display = 'flex';
        document.getElementById('invalid-top').innerHTML = 'Account Created Sucessfully';
            document.getElementById('invalid-down').style.display = 'none';
            document.getElementById('invalid-container').style.backgroundColor = 'rgb(157 255 90)';
            document.getElementById('invalid-container').style.border = 'none';

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
            
            })
            .catch(() => {
                document.getElementById('invalid-down').innerHTML = 'Failed to Create account';
            document.getElementById('invalid-top').style.display = 'none';
            document.getElementById('invalid-container').style.display = 'flex';
            });
        }
        else{
            checkValueValidation();
        }
    })

}
document.getElementById('login').addEventListener('click', checkValueValidation);



