const { getErrorResponseObject } = require('../utils/utils');
const { httpStatusCodes, ResourceNotFoundError } = require('../utils/errores');

// ===== HANDLER GLOBAL DE ERRORES =====
function errorHandler(err, _req, res, _next) {
    const errorResponse = getErrorResponseObject(err);
    return res.status(errorResponse.status).json(errorResponse);
};

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
};

// 404 para rutas no definidas
function notFoundHandler(_req, res) {
    const errorObj = new ResourceNotFoundError('No encontrado');
    const resp = getErrorResponseObject(errorObj, 'La ruta solicitada no existe.');
    return res.status(httpStatusCodes.notFound).json(resp);
};

module.exports = { 
    errorHandler, asyncHandler, 
    jsonInvalidHandler, notFoundHandler
};