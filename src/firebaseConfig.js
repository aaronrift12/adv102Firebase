import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyAquQF33E7CNHSQPb3f88Nt6H0OQEWD3As",
  authDomain: "advproject102-ae93a.firebaseapp.com",
  databaseURL: "https://advproject102-ae93a-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "advproject102-ae93a",
  storageBucket: "advproject102-ae93a.appspot.com",
  messagingSenderId: "313940887083",
  appId: "1:313940887083:web:a23bb3c520717d65694c6e"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export { app, database };
export default app; // Add this line to export app as default
