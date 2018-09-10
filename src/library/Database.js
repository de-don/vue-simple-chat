import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDA6HicmwWmpQd5yqc1MgFUm_1YVlbiNds",
  authDomain: "vuechat-68c59.firebaseapp.com",
  databaseURL: "https://vuechat-68c59.firebaseio.com",
  projectId: "vuechat-68c59",
  storageBucket: "vuechat-68c59.appspot.com",
  messagingSenderId: "420885451429"
};

let App = Firebase.initializeApp(config);

export const FirebaseApp = App;
export const FirebaseDb = App.database();
export const FirebaseAuth = App.auth();

export default {
}
