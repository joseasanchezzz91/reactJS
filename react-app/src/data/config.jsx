import firebase from 'firebase'


  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyAnx8jufHZaAmNwMi--Qn7vRbhePDI5b2M",
    authDomain: "react-app-c6be8.firebaseapp.com",
    databaseURL: "https://react-app-c6be8.firebaseio.com",
    projectId: "react-app-c6be8",
    storageBucket: "react-app-c6be8.appspot.com",
    messagingSenderId: "1071865257032"
  };
  firebase.initializeApp(config);

  export const ref = firebase.database().ref()
  export const firebaseAuth=firebase.auth