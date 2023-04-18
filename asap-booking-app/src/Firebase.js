import { initializeApp } from "firebase/app";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPUW1FW1KWzk4mjbVxeeqYqe6JfXRxUnQ",
  authDomain: "asapbooking-b9576.firebaseapp.com",
  projectId: "asapbooking-b9576",
  storageBucket: "asapbooking-b9576.appspot.com",
  messagingSenderId: "1075554800082",
  appId: "1:1075554800082:web:01969c5fefc492e2a6780b",
};

initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, "tickets");

export { colRef };
