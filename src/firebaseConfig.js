import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA2G6RnK_heBN7jqbd6qJBzytLJ9U2qC7Y",
  authDomain: "test-4f200.firebaseapp.com",
  projectId: "test-4f200",
  storageBucket: "test-4f200.appspot.com",
  messagingSenderId: "613579109265",
  appId: "1:613579109265:web:3a698fc8f2bf215dd66030"
};

const app=initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage=getStorage(app);