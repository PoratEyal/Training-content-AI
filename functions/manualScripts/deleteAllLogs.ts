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
  let count = 0;
  let batch = db.batch();

  for (const doc of querySnapshot.docs) {
    batch.delete(doc.ref);
    count++;

    if (count % 500 === 0) {
      await batch.commit();
      batch = db.batch();
      console.log(`🧹 Deleted ${count} logs...`);
    }
  }

  if (count % 500 !== 0) {
    await batch.commit();
  }

  console.log(`✅ All ${count} logs deleted.`);
}

deleteAllLogs();
