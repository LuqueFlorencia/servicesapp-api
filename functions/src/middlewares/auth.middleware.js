const { firebaseAdmin } = require('../utils/firebase.js');
const { getAuth } = require('firebase-admin/auth');
const { httpStatusCodes } = require('../utils/httpsStatusCode.js');

const auth = getAuth(firebaseAdmin);
const appToken = process.env.APP_INTERNAL_TOKEN;

const validateFirebaseIdToken = async (req, res, next) => {
    let idToken;

    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))
        return next(new AuthorizationError('Unauthorized'));

    idToken = req.headers.authorization.split('Bearer ')[1];

    try {
        const decodedIdToken = await auth.verifyIdToken(idToken);
        req.user = {
            uid: decodedIdToken.uid,
            email: decodedIdToken.email || null,
            name: decodedIdToken.name || null,
            dni: decodedIdToken.dni || null,

            // claims del provider
            firebase: decodedIdToken.firebase || {},  

            // por si necesitas revisar claims custom o el token completo
            raw: decodedIdToken
        };

        return next();
    } catch (error) {
        return next(error);
    }
};

const validateInternalFirebaseFunctionsToken = (req, res, next) => {
    let idToken;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        return res.status(httpStatusCodes.forbidden).json({
            error: 'Unauthorized',
        });
    };

    if (idToken !== appToken) { 
        return res.status(httpStatusCodes.forbidden).json({
            error: 'Unauthorized',
        });
    };

    return next();
};

module.exports = {
    validateFirebaseIdToken,
    validateInternalFirebaseFunctionsToken,
}