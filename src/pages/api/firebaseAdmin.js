// pages/api/firebaseAdmin.js

import admin from 'firebase-admin';

// Check if the Firebase Admin SDK has already been initialized
if (!admin.apps.length) {
  // Initialize Firebase Admin SDK with application default credentials
  admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
  });
}

export default admin;
