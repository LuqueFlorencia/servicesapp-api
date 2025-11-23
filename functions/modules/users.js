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

// Autenticacion para todas las rutas
app.use(auth_mw.validateFirebaseIdToken);

/* ===== RUTAS ===== */

// 1. Completar perfil personal tras login => PROPIO USER
app.patch('/me/personal',
    val_mw.validateBody(schema.initialPatchSchema),
    err_mw.asyncHandler(controller.updateMyPersonalData)
);

// 2. Actualizar usuario completo  => SOLO ADMIN
app.put('/:dni', 
    val_mw.validateParams(schema.dniUserSchema),
    auth_mw.requireAdmin,
    val_mw.validateBody(schema.userPayloadSchema),
    err_mw.asyncHandler(controller.updateUser)
);

// 3. Obtener un usuario por dni => PROPIO USER O ADMIN
app.get('/:dni', 
    val_mw.validateParams(schema.dniUserSchema),
    auth_mw.allowSelfOrAdminByDni,
    err_mw.asyncHandler(controller.getUser)
);

// 4. Actualizar datos personales => SOLO ADMIN
app.patch('/:dni/personal', 
    val_mw.validateParams(schema.dniUserSchema),
    auth_mw.requireAdmin,
    val_mw.validateBody(schema.personalPatchSchema),
    err_mw.asyncHandler(controller.updatePersonalData)
);

// 5. Cambiar rol del usuario  => SOLO ADMIN
app.patch('/:dni/role', 
    val_mw.validateParams(schema.dniUserSchema),
    auth_mw.requireAdmin,
    val_mw.validateBody(schema.rolePatchSchema),
    err_mw.asyncHandler(controller.updateUserRole)
);

// 6. Listar usuarios con filtros (role, city, province, active)  => SOLO ADMIN
app.get('/', 
    auth_mw.requireAdmin,
    val_mw.validateQuery(schema.listUsersQuerySchema),
    err_mw.asyncHandler(controller.listUsers)
);

// 7. Actualizar estado de actividad de la cuenta (activo/inactivo) => SOLO ADMIN
app.patch('/:dni/status', 
    val_mw.validateParams(schema.dniUserSchema),
    auth_mw.requireAdmin,
    val_mw.validateBody(schema.statusPatchSchema),
    err_mw.asyncHandler(controller.updateUserStatus)
);

// JSON inválido
app.use(err_mw.jsonInvalidHandler);

// 404 turas no definidas
app.use(err_mw.notFoundHandler);

// Manejador global de errores
app.use(err_mw.errorHandler);

exports.endpoints = functions.https.onRequest(app);
