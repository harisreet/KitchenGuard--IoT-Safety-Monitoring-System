import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCcr0nM3SGWDxlSOuYfRq5r2ZHk5vP_p6A",
  authDomain: "smart-kitchen-iot-76dd9.firebaseapp.com",
  databaseURL: "https://smart-kitchen-iot-76dd9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-kitchen-iot-76dd9",
  storageBucket: "smart-kitchen-iot-76dd9.firebasestorage.app",
  messagingSenderId: "508870198600",
  appId: "1:508870198600:web:2e39d63d8aa69bcfb2df7d",
  measurementId: "G-D33DSF4PMG"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
