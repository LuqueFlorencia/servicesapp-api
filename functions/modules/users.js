require('../config/environment');
const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');

const mw = require('../src/middlewares/middlewares');
const schema = require('../src/validations/schemas');
const controller = require('../src/controllers/controllers');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json()); 

// Autenticacion para todas las rutas
app.use(mw.validateFirebaseIdToken);

/* ===== RUTAS ===== */

/* ===== CRUD BASICO ===== */
// 1. Completar perfil personal tras login => PROPIO USER
app.patch('/me/personal',
    mw.validateBody(schema.initialPatchSchema),
    mw.asyncHandler(controller.updateMyPersonalData)
);

// 2. Actualizar usuario completo => SOLO ADMIN
app.put('/:dni', 
    mw.validateParams(schema.dniUserSchema),
    mw.requireAdmin,
    mw.validateBody(schema.userPayloadSchema),
    mw.asyncHandler(controller.updateUser)
);

// 3. Obtener un usuario por dni => PROPIO USER O ADMIN
app.get('/:dni', 
    mw.validateParams(schema.dniUserSchema),
    mw.allowSelfOrAdminByDni,
    mw.asyncHandler(controller.getUser)
);

// 4. Listar usuarios con filtros (role, city, province, active) => SOLO ADMIN
app.get('/', 
    mw.requireAdmin,
    mw.validateQuery(schema.listUsersQuerySchema),
    mw.asyncHandler(controller.listUsers)
);

// 5. Cambiar rol del usuario => SOLO ADMIN
app.patch('/:dni/role', 
    mw.validateParams(schema.dniUserSchema),
    mw.requireAdmin,
    mw.validateBody(schema.rolePatchSchema),
    mw.asyncHandler(controller.updateUserRole)
);

// 6. Actualizar estado de actividad de la cuenta (activo/inactivo) => SOLO ADMIN
app.patch('/:dni/status', 
    mw.validateParams(schema.dniUserSchema),
    mw.requireAdmin,
    mw.validateBody(schema.statusPatchSchema),
    mw.asyncHandler(controller.updateUserStatus)
);

/* ===== GESTION DE PLANES PREMIUM ===== */

// 7. Activar o actualizar premium de un usuario => SOLO ADMIN
app.put('/:dni/premium',
    mw.validateParams(schema.dniUserSchema),
    mw.requireAdmin,
    mw.validateBody(schema.premiumSchema),
    mw.asyncHandler(controller.updateUserPremium)
);

// 8. Pausar premium => PROPIO USER O ADMIN
app.patch('/:dni/premium/pause',
    mw.validateParams(schema.dniUserSchema),
    mw.allowSelfOrAdminByDni,
    mw.asyncHandler(controller.pausePremium)
);

// 9. Reanudar premium => PROPIO USER O ADMIN
app.patch('/:dni/premium/resume',
    mw.validateParams(schema.dniUserSchema),
    mw.allowSelfOrAdminByDni,
    mw.asyncHandler(controller.resumePremium)
);

/* ===== MANEJO DE SERVICIOS OFRECIDOS POR UN PROFESIONAL ===== */

// 10. Listar servicios que ofrece un profesional 
app.get('/:dni/services',
    mw.validateParams(schema.dniUserSchema),
    mw.asyncHandler(controller.getProfessionalServices)
);

// 11. Agregar un servicio a un profesional 
app.post('/:dni/services',
    mw.validateParams(schema.dniUserSchema),
    mw.allowSelfOrAdminByDni,
    mw.validateBody(schema.addServiceSchema),
    mw.asyncHandler(controller.addServiceToProfessional)
); 

// 12. Quitar un servicio del profesional 
app.delete('/:dni/services/:categoryId/:serviceId',
    mw.validateParams(schema.servicePathParamsSchema),
    mw.allowSelfOrAdminByDni,
    mw.asyncHandler(controller.removeServiceFromProfessional)
);

// 13. Buscar profesionales con filtros (city, province, minRate, minRateCount, categoryId, serviceId)
app.get('/search/professionals', 
    mw.validateQuery(schema.listProfessionalsQuerySchema),
    mw.asyncHandler(controller.listProfessionals)
);

/* ===== RATING DE PROFESIONALES ===== */

// 14. Calificar a un profesional => USER AUTENTICADO (no puede ser él mismo)
app.post('/:dni/rating',
    mw.validateParams(schema.dniUserSchema),
    mw.validateBody(schema.ratingProfessionalSchema),
    mw.asyncHandler(controller.rateProfessional)
);

// 15. Obtener resumen de rating de un profesional
app.get('/:dni/rating',
    mw.validateParams(schema.dniUserSchema),
    mw.asyncHandler(controller.getProfessionalRating)
);

// JSON inválido
app.use(mw.jsonInvalidHandler);

// 404 rutas no definidas
app.use(mw.notFoundHandler);

// Manejador global de errores
app.use(mw.errorHandler);

exports.endpoints = functions.https.onRequest(app);
