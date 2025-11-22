require('../config/environment');
const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');

const auth_mw = require('../src/middlewares/auth.middleware');
const val_mw = require('../src/middlewares/validate.middleware');
const err_mw = require('../src/middlewares/error.middleware');

const schema = require('../src/services/user/user.schema');
const controller = require('../src/controllers/user.controller');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json()); 

/* ===== RUTAS ===== */

// Crear / actualizar usuario completo
app.put('/', 
    //auth_mw.validateFirebaseIdToken,
    val_mw.validateBody(schema.userPayloadSchema),
    err_mw.asyncHandler(controller.upsertUser)
);

// Obtener un usuario por uid
app.get('/:uid', 
    //auth_mw.validateFirebaseIdToken,
    val_mw.validateParams(schema.uidUserSchema),
    err_mw.asyncHandler(controller.getUserById)
);

app.use(err_mw.jsonInvalidHandler);
app.use(err_mw.notFoundHandler);
app.use(err_mw.errorHandler);

exports.endpoints = functions.https.onRequest(app);
