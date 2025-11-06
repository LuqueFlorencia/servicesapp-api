const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');

admin.initializeApp();

exports.onAuthCreateProfile = functions.auth.user().onCreate(async (user) => {
    const uid = user.uid;
    const email = user.email ?? '';
    const db = admin.database();

    const profile = {
        role: 'client',
        email,
        personal: {
            displayName: user.displayName ?? '',
            photoURL: user.photoURL ?? '',
            address: '',
            city: '',
            province: '',
            ratingAvg: 0,
            ratingCount: 0,
        },
        premium: { active: false, plan: 'standard', paused: false, since: null },
        services: {},
    };

    await db.ref(`users/${uid}`).set(profile);
});

exports.users = require('./modules/users').endpoints;

/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

//const {setGlobalOptions} = require("firebase-functions");
//const {onRequest} = require("firebase-functions/https");
//const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
//setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
