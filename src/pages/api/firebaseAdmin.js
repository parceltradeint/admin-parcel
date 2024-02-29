// pages/api/firebaseAdmin.js

import admin from 'firebase-admin';

// Check if the Firebase Admin SDK has already been initialized
if (!admin.apps.length) {
  // Initialize Firebase Admin SDK with application default credentials
  admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: "admin-parcel-dash",
      databaseURL: "https://admin-parcel-dash-default-rtdb.firebaseio.com"
  });
}

export default admin;
