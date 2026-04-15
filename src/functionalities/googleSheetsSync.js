import Papa from "papaparse";
import { collection, doc, getDoc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1yt5qnYX_tb9_rs1gme5tWMLgHF-ZXECCyDc4WpZtzQY/export?format=csv&gid=1972102221";

export const syncGoogleSheets = async () => {
  try {
    const response = await fetch(SHEET_CSV_URL);
    const csvText = await response.text();
    const parsedData = Papa.parse(csvText, { header: true, skipEmptyLines: true });
    
    // Get doc reference to store our last sync state
    const metaRef = doc(db, "system", "syncMeta");
    const metaSnap = await getDoc(metaRef);
    const lastSyncTime = metaSnap.exists() ? metaSnap.data().lastSyncTime : new Date(0).toISOString();
    
    let processedAny = false;
    let latestTimestamp = lastSyncTime;

    for (let row of parsedData.data) {
       const timestamp = row["Timestamp"];
       if (!timestamp || new Date(timestamp) <= new Date(lastSyncTime)) continue;
       
       const urn = row["URN NO"]?.trim();
       if (!urn) continue;

       const engagementScaleStr = row["On the scale out of 1 to 10 how engaged are you in this subject"];
       const engagementVal = parseFloat(engagementScaleStr) || 0;
       
       const studentRef = doc(db, "students", urn);
       const studentSnap = await getDoc(studentRef);
       
       const sentimentOptions = ["Positive", "Neutral", "Negative"];
       const randomSentiment = sentimentOptions[Math.floor(Math.random() * sentimentOptions.length)];

       if (studentSnap.exists()) {
           const studentData = studentSnap.data();
           const newParticipation = (studentData.participation || 0) + 1;
           const currentQuizScore = studentData.quizScore || 0;
           const newQuizScore = (currentQuizScore + engagementVal) / 2;
           
           await updateDoc(studentRef, {
               participation: newParticipation,
               quizScore: newQuizScore,
               sentimentHistory: arrayUnion(randomSentiment),
               latestFeedback: row["Student's feedback"] || studentData.latestFeedback
           });
       } else {
           // If student doesn't exist, we create them
           await setDoc(studentRef, {
               id: urn,
               name: row["NAME"] || "Unknown",
               participation: 1,
               quizScore: engagementVal / 2, // base calculation
               sentimentHistory: [randomSentiment],
               latestFeedback: row["Student's feedback"] || ""
           }, { merge: true });
       }
       
       processedAny = true;
       // Keep track of the highest timestamp we've seen
       if (new Date(timestamp) > new Date(latestTimestamp)) {
           latestTimestamp = timestamp;
       }
    }
    
    if (processedAny) {
        await setDoc(metaRef, { lastSyncTime: latestTimestamp }, { merge: true });
        console.log("Synced new Google Sheet records to Firebase.");
    }

  } catch (error) {
     console.error("Failed to sync from Google Sheets", error);
  }
};
