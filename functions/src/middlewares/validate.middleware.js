const { DataValidationError } = require('../utils/errores');

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

module.exports = { validate, validateBody, validateQuery, validateParams };
