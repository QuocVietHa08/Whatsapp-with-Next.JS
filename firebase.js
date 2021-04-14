import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAyprSoLjca5bdJrfxMkciWCmcftNrTKkc',
  authDomain: 'whatsapp-358ea.firebaseapp.com',
  projectId: 'whatsapp-358ea',
  storageBucket: 'whatsapp-358ea.appspot.com',
  messagingSenderId: '554102443785',
  appId: '1:554102443785:web:6b5fc9f57637f4ea928dd8',
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
