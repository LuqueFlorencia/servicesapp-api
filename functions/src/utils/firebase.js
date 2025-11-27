const { initializeApp, getApp, getApps, cert } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');
require('dotenv').config({ path: require('path').join(__dirname, '..', '..', '.env') });
// const sa = require(`../../permissions/${process.env.CREDENTIALS_FILE_NAME}`);
const sa = require(`../../permissions/secret.json`);


let firebaseAdmin;

if (getApps().length === 0) {
    firebaseAdmin = initializeApp({
        credential: cert(sa),      
        databaseURL: process.env.RTDB_FIREBASE_DATABASE_URL
    });
} else {
    firebaseAdmin = getApp();
};

const db = getDatabase(firebaseAdmin);

module.exports = { firebaseAdmin, db }; 
