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

const statisticsRef = ref(db, `Stats/Total_Accounts`);
let totalAccounts = 0;

get(statisticsRef).then((snapshot) => {
    if (snapshot.exists()) {
        totalAccounts = snapshot.val();
        console.log(totalAccounts);
    }
    else{
        totalAccounts = 0;
        console.log('NO DATA FOUND');   
    }
    document.getElementById('total-users-p').innerHTML = `${totalAccounts}`;
})

