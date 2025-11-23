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

// Completar perfil personal tras login => PROPIO USER
app.patch('/me/personal',
    auth_mw.validateFirebaseIdToken,
    val_mw.validateBody(schema.initialPatchSchema),
    err_mw.asyncHandler(controller.updateMyPersonalData)
);

// Actualizar usuario completo  => SOLO ADMIN
app.put('/:uid', 
    auth_mw.validateFirebaseIdToken,
    val_mw.validateParams(schema.uidUserSchema),
    auth_mw.requireAdmin,
    val_mw.validateBody(schema.userPayloadSchema),
    err_mw.asyncHandler(controller.updateUser)
);

// Obtener un usuario por uid => PROPIO USER O ADMIN
app.get('/:uid', 
    auth_mw.validateFirebaseIdToken,
    val_mw.validateParams(schema.uidUserSchema),
    auth_mw.allowSelfOrAdminByDni,
    err_mw.asyncHandler(controller.getUser)
);

// Actualizar datos personales  => PROPIO USER O ADMIN
app.patch('/:uid/personal', 
    auth_mw.validateFirebaseIdToken,
    val_mw.validateParams(schema.uidUserSchema),
    auth_mw.allowSelfOrAdminByDni,
    val_mw.validateBody(schema.personalPatchSchema),
    err_mw.asyncHandler(controller.updatePersonalData)
);

// Cambiar rol del usuario  => SOLO ADMIN
app.patch('/:uid/role', 
    auth_mw.validateFirebaseIdToken,
    val_mw.validateParams(schema.uidUserSchema),
    auth_mw.requireAdmin,
    val_mw.validateBody(schema.rolePatchSchema),
    err_mw.asyncHandler(controller.updateUserRole)
);

// Listar usuarios con filtros (role, city, province)  => SOLO ADMIN
app.get('/', 
    auth_mw.validateFirebaseIdToken,
    auth_mw.requireAdmin,
    val_mw.validateQuery(schema.listUsersQuerySchema),
    err_mw.asyncHandler(controller.listUsers)
);

// Actualizar estado de actividad de la cuenta (activo/inactivo) => SOLO ADMIN
app.patch('/:uid/status', 
    auth_mw.validateFirebaseIdToken,
    val_mw.validateParams(schema.uidUserSchema),
    auth_mw.requireAdmin,
    val_mw.validateBody(schema.statusPatchSchema),
    err_mw.asyncHandler(controller.updateUserStatus)
);

app.use(err_mw.jsonInvalidHandler);
app.use(err_mw.notFoundHandler);
app.use(err_mw.errorHandler);

exports.endpoints = functions.https.onRequest(app);
