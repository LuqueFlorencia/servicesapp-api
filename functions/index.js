const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");

admin.initializeApp();

exports.onAuthCreateProfile = functions.auth.user().onCreate(async (user) => {
  const uid = user.uid;
  const email = user.email ?? "";
  const db = admin.database();

  const profile = {
    role: "client",
    is_deleted: false,
    email,
    personal: {
      displayName: user.displayName ?? "",
      dni: "",
      photoURL: user.photoURL ?? "",
      address: "",
      city: "",
      province: "",
      ratingAvg: 0,
      ratingCount: 0,
    },
    premium: { active: false, plan: "standard", paused: false, since: null },
    services: {},
  };

  const snap = await db.ref(`users/${uid}`).once("value");

  if (!snap.exists()) await db.ref(`users/${uid}`).set(profile);
});

<<<<<<< HEAD
exports.users = require("./modules/users").endpoints;
exports.appointments = require("./modules/appointment").endpoints;
exports.categories = require("./modules/categories").endpoints;
exports.services = require("./modules/services").endpoints;
exports.reviews = require("./modules/reviews").endpoints;
=======
exports.users = require('./modules/users').endpoints;
exports.external = require('./modules/external').endpoints;
>>>>>>> f5f43dc7fd6fdb0afe05b9d7fd46fa81f33622f9
