import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDfiGiLejpnObyRMuRpO35fYAjA6iMprlw",
  authDomain: "caro-game-app.firebaseapp.com",
  projectId: "caro-game-app",
  storageBucket: "caro-game-app.appspot.com",
  messagingSenderId: "491708874351",
  appId: "1:491708874351:web:691b15c10b8d379517979a",
  measurementId: "G-23YJ1TBRX5"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);