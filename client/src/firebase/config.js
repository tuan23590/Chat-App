import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDY8XxQJkdGK4IyCrYRNtFHPkKxsHYc1-o",
  authDomain: "chat-app-53c04.firebaseapp.com",
  projectId: "chat-app-53c04",
  storageBucket: "chat-app-53c04.appspot.com",
  messagingSenderId: "1089632944052",
  appId: "1:1089632944052:web:c781791452ec3709dd7ce1",
  measurementId: "G-M06K9W71PS"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);