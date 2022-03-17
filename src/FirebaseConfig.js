import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeqpcnKlEpJEwkpQACdwppk58vtDtQukg",
  authDomain: "music-manager-app-f7a3b.firebaseapp.com",
  projectId: "music-manager-app-f7a3b",
  storageBucket: "music-manager-app-f7a3b.appspot.com",
  messagingSenderId: "326465771166",
  appId: "1:326465771166:web:84029c50a2286a09158d8f",
  measurementId: "G-HYBLDN971V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);