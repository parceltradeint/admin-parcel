const admin = require("firebase-admin");

// const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

export const adminContext = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // ...firebaseConfig
});