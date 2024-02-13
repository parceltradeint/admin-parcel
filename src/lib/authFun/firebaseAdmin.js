const admin = require("firebase-admin");

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
firebaseConfig.databaseURL = "https://otul-pro-default-rtdb.firebaseio.com";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  ...firebaseConfig
});

module.exports = {
  admin,
};
