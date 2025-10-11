const env = 'dev';
const { httpStatusCodes, DataValidationError, DatabaseError, AuthorizationError, ResourceNotFoundError } = require('./httpsStatusCode');

function getDateNow() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth()).padStart(2, '0');
    var yyyy = today.getFullYear();

    return (today = mm + '/' + dd + '/' + yyyy);
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
    if (error instanceof AuthorizationError) {
        response.status = httpStatusCodes.unauthorized;
    } else if (error instanceof DataValidationError) {
        response.status = httpStatusCodes.badRequest;
    } else if (error instanceof DatabaseError) {
        response.status = httpStatusCodes.internalServerError;
    } else if (error instanceof ResourceNotFoundError) {
        response.status = httpStatusCodes.notFound;
    } else {
        response.status = httpStatusCodes.internalServerError;
    }

    response.message = message;
    response.title = error.message || error.code || error;

    return response;
};

module.exports = { 
    getDateNow, 
    getSuccessResponseObject, 
    getErrorResponseObject 
};
