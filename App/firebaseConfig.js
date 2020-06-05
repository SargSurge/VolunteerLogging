import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyD47y-yAHSEJXE9RgSwgosKIdEYNf2nVwA",
    authDomain: "vlog-e051f.firebaseapp.com",
    databaseURL: "https://vlog-e051f.firebaseio.com",
    projectId: "vlog-e051f",
    storageBucket: "vlog-e051f.appspot.com",
    messagingSenderId: "443390883046",
    appId: "1:443390883046:web:7a576c4b5509b94a443727",
    measurementId: "G-5J46PSYM7M"
  };
  
firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();

// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// const emailAuthProvider = new firebase.auth.EmailAuthProvider();

export { auth, firebase, db };