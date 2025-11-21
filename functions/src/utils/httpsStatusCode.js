class DataValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DataValidationError';
    };
};

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
    };
};

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    };
};

class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DatabaseError';
    };
};

class AuthorizationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthorizationError';
    };
};

class ResourceNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ResourceNotFoundError';
    };
};

class EmptySetError extends Error {
    constructor(message) {
        super(message);
        this.name = "EmptySetError"
    }
}

const httpStatusCodes = {
    ok: 200,
    created: 201,
    noContent: 204,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    unprocessableEntity: 422,
    tooManyRequests: 429,
    internalServerError: 500, 
};

module.exports = { 
    httpStatusCodes, 
    DataValidationError, 
    BadRequestError,
    NotFoundError,
    DatabaseError, 
    AuthorizationError, 
    ResourceNotFoundError,
    EmptySetError
};