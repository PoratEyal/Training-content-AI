// Backup DB table
// cd C:\Dev\ActivityWiz\functions\manualScripts>
// run: npx ts-node <script-name>.ts

import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";

// נמצא בכוונה מחוץ לפרוייקט כדי שלא בטעות נעשה Commit
const serviceAccount = require("C:/Dev/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function backupActivity() {
  try {
    const snapshot = await db.collection("activity").get();
    const data: Record<string, any> = {};

    snapshot.forEach((doc) => {
      data[doc.id] = doc.data();
    });

    const backupPath = path.join(__dirname, "backupActivity.json");
    fs.writeFileSync(backupPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("❌ Error backing up activity:", error);
  }
}

backupActivity();
