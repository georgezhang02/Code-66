import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyANDubsjWPnO8H7oraOGQnKEsn4cYFLCow",
    authDomain: "code-66.firebaseapp.com",
    databaseURL: "https://code-66.firebaseio.com",
    projectId: "code-66",
    storageBucket: "code-66.appspot.com",
    messagingSenderId: "647894819401",
    appId: "1:647894819401:web:4c9e013204624ca1155598",
    measurementId: "G-2V8ZZB96GM"
};

firebase.initializeApp(firebaseConfig);

export default firebase;