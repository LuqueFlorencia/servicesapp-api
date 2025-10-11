require('../config/environment');

const express = require('express');
const cors = require('cors');

const functions = require('firebase-functions');

const { getUserId, createUserData } = require('../src/services/user.service');

const { validateFirebaseIdToken } = require('../src/utils/middleware');
const { getErrorResponseObject, getSuccessResponseObject } = require('../src/utils/utils');
const { httpStatusCodes } = require('../src/utils/httpsStatusCode');

const app = express();
app.use(cors({ origin: true }));

// METODOS
app.get('/', /*validateFirebaseIdToken,*/ async (req, res) => {
    try {
        const userId = req.query.userId;
        const response = await getUserId(userId);
        return res.status(httpStatusCodes.ok).json(response);
    } catch (error) {
        const errorResponse = getErrorResponseObject(error, 'Algo salio mal.');
        return res.status(httpStatusCodes.internalServerError).json(errorResponse);
    }
});

app.post('/', /*validateFirebaseIdToken,*/ async (req, res) => {
    try {
        const data = req.body;
        const response = await createUserData(data);

        return res.status(httpStatusCodes.created).json(response);
    } catch (error) {
        const errorResponse = getErrorResponseObject(error, 'Algo salio mal.');
        return res.status(httpStatusCodes.internalServerError).json(errorResponse);
    }
});

exports.endpoints = functions.https.onRequest(app);
