
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, get, set, ref, update} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0q2rJGQYvWLs4JPcoy7ki9kvoIqJJtPQ",
  authDomain: "notefolio-4eacc.firebaseapp.com",
  databaseURL: "https://notefolio-4eacc-default-rtdb.firebaseio.com",
  projectId: "notefolio-4eacc",
  storageBucket: "notefolio-4eacc.firebasestorage.app",
  messagingSenderId: "372329554135",
  appId: "1:372329554135:web:0675a2880a1978e23d1092"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);




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
    const statistics = ref(db, `Stats/`);
    let totalAccounts;

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
            get(statistics).then((snapshot) => {
                if (snapshot.exists()) {
                    totalAccounts = snapshot.val().Total_Accounts;
                    update(statistics, {
                        Total_Accounts: Number(totalAccounts + 1)
                   })
                }
                else{
                    set(statistics, {
                        Total_Accounts: 1
                    })
                }
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



