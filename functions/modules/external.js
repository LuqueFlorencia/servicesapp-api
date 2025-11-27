require('../config/environment');
const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');

const mw = require('../src/middlewares/middlewares');
const controller = require('../src/controllers/controllers');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json()); 

app.get('/categories', 
    mw.asyncHandler(controller.getCategoriesFromPy)
);

// JSON inválido
app.use(mw.jsonInvalidHandler);

// 404 rutas no definidas
app.use(mw.notFoundHandler);

// Manejador global de errores
app.use(mw.errorHandler);

exports.endpoints = functions.https.onRequest(app);
