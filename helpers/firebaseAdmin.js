// firebaseAdmin.js
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK with your service account key
const serviceAccount = require("./firebaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
