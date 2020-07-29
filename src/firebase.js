import firebase from 'firebase'
import 'firebase/firebase-firestore'

 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyALwa6eIevVODsLP8iF95_HwAz9Gw-lVgs",
    authDomain: "todos-c1be8.firebaseapp.com",
    databaseURL: "https://todos-c1be8.firebaseio.com",
    projectId: "todos-c1be8",
    storageBucket: "todos-c1be8.appspot.com",
    messagingSenderId: "1059304200923",
    appId: "1:1059304200923:web:a177375ebc1549f8c6cafe",
    measurementId: "G-1W0F32N5J3"
  };
  // Initialize Firebase
  const firebaseapp=firebase.initializeApp(firebaseConfig);
  const firestore=firebaseapp.firestore();
  
  //firebase.analytics();

  export default firestore
