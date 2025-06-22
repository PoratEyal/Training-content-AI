import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";

// נמצא בכוונה מחוץ לפרוייקט כדי שלא בטעות נעשה Commit
const serviceAccount = require("C:/Dev/serviceAccountKey.json");

// 🔐 Initialize Firebase Admin SDK using service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 🧠 Main function: backup all documents from "users" collection
async function backupUsers() {
  const usersRef = db.collection("users");
  const snapshot = await usersRef.get();

  const usersData: Record<string, any> = {};

  snapshot.forEach((doc) => {
    usersData[doc.id] = doc.data();
  });

  const backupPath = path.join(__dirname, "users-backup.json");
  fs.writeFileSync(backupPath, JSON.stringify(usersData, null, 2));
  console.log(`✅ Backup saved to ${backupPath}`);
}

// 🚀 Run
backupUsers().catch((err) => {
  console.error("❌ Error during backup:", err);
});
