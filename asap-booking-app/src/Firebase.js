import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPUW1FW1KWzk4mjbVxeeqYqe6JfXRxUnQ",
  authDomain: "asapbooking-b9576.firebaseapp.com",
  projectId: "asapbooking-b9576",
  storageBucket: "asapbooking-b9576.appspot.com",
  messagingSenderId: "1075554800082",
  appId: "1:1075554800082:web:01969c5fefc492e2a6780b",
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCa-qx6nbo0Ju4FRBBSRjy4ts5r02_Hlng",
//   authDomain: "asap-booking-v1.firebaseapp.com",
//   projectId: "asap-booking-v1",
//   storageBucket: "asap-booking-v1.appspot.com",
//   messagingSenderId: "506909957",
//   appId: "1:506909957:web:55032004ef6d4ce92e136c",
// };
initializeApp(firebaseConfig);
const db = getFirestore();
const ticketsColRef = collection(db, "tickets");
const servicesColRef = collection(db, "services");

export { ticketsColRef, db, servicesColRef };
