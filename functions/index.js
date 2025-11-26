const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');

admin.initializeApp();

exports.onAuthCreateProfile = functions.auth.user().onCreate(async (user) => {
    const uid = user.uid;
    const email = user.email ?? '';
    const db = admin.database();

    const profile = {
        role: 'client',
        is_deleted: false,
        email,
        personal: {
            displayName: user.displayName ?? '',
            dni: '',
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

    const snap = await db.ref(`users/${uid}`).once('value');
    
    if (!snap.exists())
        await db.ref(`users/${uid}`).set(profile);
});

exports.users = require('./modules/users').endpoints;
exports.external = require('./modules/external').endpoints;