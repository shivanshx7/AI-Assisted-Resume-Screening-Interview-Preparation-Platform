import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyASDZHXZq_3GVsCarkZhRA-eMYvbXi0paU",
    authDomain: "student-engagement-track-a3d86.firebaseapp.com",
    databaseURL: "https://student-engagement-track-a3d86-default-rtdb.firebaseio.com",
    projectId: "student-engagement-track-a3d86",
    storageBucket: "student-engagement-track-a3d86.firebasestorage.app",
    messagingSenderId: "448854823442",
    appId: "1:448854823442:web:6ea0399791681c76ddfecb",
    measurementId: "G-PRJ6SWK6MD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkDb() {
  try {
    const querySnapshot = await getDocs(collection(db, "students"));
    const students = [];
    querySnapshot.forEach((doc) => {
      students.push({ id: doc.id, name: doc.data().name, engagementScore: doc.data().engagementScore });
    });
    console.log("Students currently in Firebase DB:");
    console.table(students);
    process.exit(0);
  } catch(e) {
    console.error("Error fetching db", e);
    process.exit(1);
  }
}

checkDb();
