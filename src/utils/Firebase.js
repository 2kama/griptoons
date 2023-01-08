import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

// Initalize and export Firebase.
const config = {

    //test
    apiKey: "AIzaSyCPQqJSaOrKuEnrd3V_WvHa8HyID8erd7g",
    authDomain: "griptoons-dev.firebaseapp.com",
    projectId: "griptoons-dev",
    storageBucket: "griptoons-dev.appspot.com",
    messagingSenderId: "1021806440420",
    appId: "1:1021806440420:web:76dda03c9827257b2261f1",
    measurementId: "G-PW39NYYCXJ"

    // //prod
    // apiKey: "AIzaSyAzAp6R2PzecSyeixvehrdtGnJ3m3-b4rE",
    // authDomain: "griptoons-prod.firebaseapp.com",
    // projectId: "griptoons-prod",
    // storageBucket: "griptoons-prod.appspot.com",
    // messagingSenderId: "599289876791",
    // appId: "1:599289876791:web:c60525c3093c40e74f4ab2",
    // measurementId: "G-DB618GF30R"
};

firebase.initializeApp(config)

// const settings = {timestampsInSnapshots: true};

// firebase.firestore().settings(settings)

export default firebase



