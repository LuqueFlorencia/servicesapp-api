// modules/categories.js
require('../config/environment');

const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');

const { getSuccessResponseObject } = require('../src/utils/utils');
const { httpStatusCodes } = require('../src/utils/httpsStatusCode');

const {
    validateBody,
    validateQuery,
    asyncHandler,
    jsonInvalidHandler,
    notFoundHandler,
    errorHandler
} = require('../src/utils/validate');

const { categorySchema } = require('../src/services/categories/category.schema');

const {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require('../src/services/categories/category.service');

const Joi = require('joi');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());


// Crear categoría
app.post(
    '/create',
    validateBody(categorySchema),
    asyncHandler(async (req, res) => {
        const created = await createCategory(req, res);

        return res.status(httpStatusCodes.created).json(
            getSuccessResponseObject(
                created,
                httpStatusCodes.created,
                'Creado',
                'Categoría creada correctamente.'
            )
        );
    })
);


// Obtener todas las categorías
app.get(
    '/',
    asyncHandler(async (req, res) => {
        const data = await getCategories(req, res);

        return res.status(httpStatusCodes.ok).json(
            getSuccessResponseObject(
                data,
                httpStatusCodes.ok,
                'OK',
                'Categorías obtenidas.'
            )
        );
    })
);


// Obtener una categoría por ID
app.get(
    '/one',
    validateQuery(
        Joi.object({
            id: Joi.string()
                .required()
                .messages({ 'any.required': 'id es requerido' })
        })
    ),
    asyncHandler(async (req, res) => {
        const category = await getCategory(req, res);

        return res.status(httpStatusCodes.ok).json(
            getSuccessResponseObject(
                category,
                httpStatusCodes.ok,
                'OK',
                'Categoría obtenida.'
            )
        );
    })
);


// Actualizar categoría
app.patch(
    '/update',
    validateQuery(
        Joi.object({
            id: Joi.string()
                .required()
                .messages({ 'any.required': 'id es requerido' })
        })
    ),
    validateBody(categorySchema),
    asyncHandler(async (req, res) => {
        const updated = await updateCategory(req, res);

        return res.status(httpStatusCodes.ok).json(
            getSuccessResponseObject(
                updated,
                httpStatusCodes.ok,
                'OK',
                'Categoría actualizada.'
            )
        );
    })
);


// Eliminar categoría
app.delete(
    '/delete',
    validateQuery(
        Joi.object({
            id: Joi.string()
                .required()
                .messages({ 'any.required': 'id es requerido' })
        })
    ),
    asyncHandler(async (req, res) => {
        const deleted = await deleteCategory(req, res);

        return res.status(httpStatusCodes.ok).json(
            getSuccessResponseObject(
                deleted,
                httpStatusCodes.ok,
                'OK',
                'Categoría eliminada.'
            )
        );
    })
);

app.use(jsonInvalidHandler);
app.use(notFoundHandler);
app.use(errorHandler);

exports.endpoints = functions.https.onRequest(app);
