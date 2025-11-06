const { httpStatusCodes, DataValidationError, DatabaseError, AuthorizationError, ResourceNotFoundError } = require('./httpsStatusCode');

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

function getErrorResponseObject(error, message){
    const response = {};
    console.log('ERROR ', error);

    if (error instanceof AuthorizationError)
        response.status = httpStatusCodes.unauthorized;
    else if (error instanceof DataValidationError)
        response.status = httpStatusCodes.badRequest;
    else if (error instanceof DatabaseError)
        response.status = httpStatusCodes.internalServerError;
    else if (error instanceof ResourceNotFoundError)
        response.status = httpStatusCodes.notFound;
    else if (error && typeof error.code === 'string' && error.code.startsWith('auth/'))
        response.status = httpStatusCodes.unauthorized;
    else
        response.status = httpStatusCodes.internalServerError;

    response.message = message;
    response.title = error.message || error.code || error;

    return response;
};

module.exports = { 
    getDateNow, 
    getSuccessResponseObject, 
    getErrorResponseObject 
};
