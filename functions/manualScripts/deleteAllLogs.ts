// Clean up all logs in the table and start fresh
// cd .\functions\manualScripts\
// run: npx ts-node deleteAllLogs.ts
import * as admin from "firebase-admin";

const serviceAccount = require("C:/Dev/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function deleteAllLogs() {
  const logsRef = db.collection("logs");
  const querySnapshot = await logsRef.get();

  if (querySnapshot.empty) {
    console.log("✅ No logs found.");
    return;
  }

  console.log(`🧹 Deleting ${querySnapshot.size} log(s)...`);
  const batch = db.batch();

  querySnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log("✅ All logs deleted.");
}

deleteAllLogs();
