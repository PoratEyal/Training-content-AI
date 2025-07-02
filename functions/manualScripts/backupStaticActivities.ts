// Backup DB table
// cd C:\Dev\ActivityWiz\functions\manualScripts>
// run: npx ts-node <script-name>.ts
import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";

// נמצא בכוונה מחוץ לפרויקט כדי שלא בטעות נעשה Commit
const serviceAccount = require("C:/Dev/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function backupStaticActivities() {
  try {
    const snapshot = await db.collection("staticActivities").get();
    const data: Record<string, any> = {};

    snapshot.forEach((doc) => {
      data[doc.id] = doc.data();
    });

    const backupPath = path.join(__dirname, "backupStaticActivities.json");
    fs.writeFileSync(backupPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("❌ Error backing up staticActivities:", error);
  }
}

backupStaticActivities();
