// Delete logs by userID
// Run:
// cd .\functions\manualScripts\
// run: npx ts-node deleteLogsByUser.ts

import * as admin from "firebase-admin";

// נמצא בכוונה מחוץ לפרוייקט כדי שלא בטעות נעשה Commit
const serviceAccount = require("C:/Dev/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function deleteLogsByUser(userID: string) {
  const logsRef = db.collection("logs");
  const querySnapshot = await logsRef.where("userID", "==", userID).get();

  if (querySnapshot.empty) {
    console.log(`✅ No logs found for userID: ${userID}`);
    return;
  }

  console.log(`🧹 Deleting ${querySnapshot.size} log(s) for userID: ${userID}`);
  const batch = db.batch();

  querySnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log(`✅ Deletion complete.`);
}

deleteLogsByUser("lior.porat@gmail.com");
