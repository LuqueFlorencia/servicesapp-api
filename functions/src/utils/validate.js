const { DataValidationError, ResourceNotFoundError } = require('./httpsStatusCode');
const { getErrorResponseObject } = require('./utils');

const defaultOptions = {
    abortEarly: false,     // acumula todos los errores
    stripUnknown: true,    // elimina claves no definidas en el esquema
    convert: true,         // convierte strings numéricas cuando aplica
};

function mapJoiDetailToMessage(d) {
    return d.message;
};

// ===== VALIDADOR CON JOI =====
function validate(schema, source = 'body', options = {}) {
    const opts = { ...defaultOptions, ...options };

    return (req, _res, next) => {
        const data = req[source];
        const { error, value } = schema.validate(data, opts);

        if (error) {
            const msg = error.details.map(mapJoiDetailToMessage).join(' | ');
            return next(new DataValidationError(msg));
        }

        req[source] = value;
        next();
    };
};

const validateBody  = (schema, options) => validate(schema, 'body',  options);
const validateQuery = (schema, options) => validate(schema, 'query', options);
const validateParams= (schema, options) => validate(schema, 'params',options);

// ===== HANDLER GLOBAL DE ERRORES =====
function errorHandler(err, _req, res, _next) {
    const errorResponse = getErrorResponseObject(err, 'Algo salio mal.');
    return res.status(errorResponse.status).json(errorResponse);
}

// ===== WRAPPER ASYNC =====
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// JSON inválido → 400
function jsonInvalidHandler(err, _req, res, next) {
    if (err instanceof SyntaxError && 'body' in err) {
        const errorObj = new ResourceNotFoundError('JSON inválido');
        const resp = getErrorResponseObject(errorObj, 'El cuerpo de la solicitud no es un JSON válido.');
        return res.status(httpStatusCodes.badRequest).json(resp);
    }
    next(err);
}

// 404 para rutas no definidas
function notFoundHandler(_req, res) {
    const errorObj = new ResourceNotFoundError('No encontrado');
    const resp = getErrorResponseObject(errorObj, 'La ruta solicitada no existe.');
    return res.status(httpStatusCodes.notFound).json(resp);
}

module.exports = { 
    validate, validateBody, validateQuery, validateParams, 
    errorHandler, asyncHandler, 
    jsonInvalidHandler, notFoundHandler
};
