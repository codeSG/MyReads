import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  apiKey: "AIzaSyBcm9IrNEMipeCW5g8kKIAeyeME82OpUsA",
  authDomain: "uploadingfile-b50cc.firebaseapp.com",
  projectId: "uploadingfile-b50cc",
  storageBucket: "uploadingfile-b50cc.appspot.com",
  messagingSenderId: "933399224058",
  appId: "1:933399224058:web:beb782e862b9c2e086f343",
  storageBucket: 'gs://uploadingfile-b50cc.appspot.com'

} ; 
// Initialse the firebase 
const app = initializeApp(firebaseConfig) ; 
export const storage = getStorage(app) ; 
export const auth = getAuth(app);