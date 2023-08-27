import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDdr0KFzms3WAkHGF35rCW_jVZSHtAg45E",
  authDomain: "projx-9a119.firebaseapp.com",
  projectId: "projx-9a119",
  storageBucket: "projx-9a119.appspot.com",
  messagingSenderId: "590175522306",
  appId: "1:590175522306:web:7c66a6e026cff1af35611b",
  measurementId: "G-CQMQ73MZ0Q"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app);
export {
    db,
    auth,
    storage
}
