const util = require('./errores');

function getDateNow() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return `${mm}/${dd}/${yyyy}`;
};

function getSuccessResponseObject(payload, statusCode, title, message){
    return {
        status: statusCode,
        payload: payload,
        message: message,
        title: title
    };
};

function getErrorResponseObject(error, message = 'Algo salio mal.'){
    const response = {};
    console.log('ERROR ', error);

    if (error instanceof util.DataValidationError || error instanceof util.BadRequestError)
        response.status = util.httpStatusCodes.badRequest;
    else if (error instanceof util.AuthorizationError)
        response.status = util.httpStatusCodes.unauthorized;
    else if (error instanceof util.ForbiddenError)
        response.status = util.httpStatusCodes.forbidden;
    else if (error instanceof util.NotFoundError || error instanceof util.ResourceNotFoundError)
        response.status = util.httpStatusCodes.notFound;
    else if (error instanceof util.DatabaseError)
        response.status = util.httpStatusCodes.internalServerError;
    else if (error && typeof util.code === 'string' && error.code.startsWith('auth/'))
        response.status = util.httpStatusCodes.unauthorized;
    else
        response.status = util.httpStatusCodes.internalServerError;

    response.message = error.message || message;
    response.title = error.name || error.code || error;

    return response;
};

module.exports = { 
    getDateNow, 
    getSuccessResponseObject, 
    getErrorResponseObject 
};
