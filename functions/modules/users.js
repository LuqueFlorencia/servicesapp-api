require('../config/environment');

const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');

const { getSuccessResponseObject, getErrorResponseObject } = require('../src/utils/utils');
const { httpStatusCodes } = require('../src/utils/httpsStatusCode');
const { validateBody, validateQuery, errorHandler, asyncHandler, jsonInvalidHandler, notFoundHandler } = require('../src/utils/validate');

const { getUserQuerySchema, updateProfileSchema, createUserRequestSchema } = require('../src/services/user/user.schema');
const { getUserId, updateMyProfile , createUserData } = require('../src/services/user/user.service');
const { validateFirebaseIdToken } = require('../src/utils/middleware');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json()); 

/* ===== RUTAS ===== */
// GET /?userId=...
app.get('/', 
    /*validateFirebaseIdToken,*/
    validateQuery(getUserQuerySchema),
    asyncHandler(async (req, res) => {
        const { userId } = req.query;
        const data = await getUserId(userId);
        return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
            data, httpStatusCodes.ok, 'OK', 'Usuario obtenido.'
        ));
}));

// PUT /  (actualiza perfil del usuario autenticado)
app.put('/', 
    validateFirebaseIdToken,
    validateBody(updateProfileSchema),
    asyncHandler(async (req, res) => {
        const uid = req.user.uid;
        const data = await updateMyProfile(uid, req.body);
        return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
            data, httpStatusCodes.ok, 'OK', 'Perfil actualizado.'
        ));
    })
);

// POST /  (crea perfil users/{uid})
app.post('/', 
    /*validateFirebaseIdToken,*/
    validateBody(createUserRequestSchema),
    asyncHandler(async (req, res) => {
        const data = await createUserData(req.body);
        return res.status(httpStatusCodes.created).json(getSuccessResponseObject(
            data, httpStatusCodes.created, 'Creado', 'Usuario creado.'
        ));
    })
);

app.use(jsonInvalidHandler);
app.use(notFoundHandler);
app.use(errorHandler);

exports.endpoints = functions.https.onRequest(app);
