const { firebaseAdmin } = require('./firebase.js');
const { getAuth } = require('firebase-admin/auth');
const { httpStatusCodes } = require('./httpsStatusCode');

const auth = getAuth(firebaseAdmin);
const appToken = process.env.APP_INTERNAL_TOKEN;

const validateFirebaseIdToken = async (req, res, next) => {
    let idToken;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        return res.status(httpStatusCodes.forbidden).json({
            error: 'Unauthorized',
        });
    };

    try {
        const decodedIdToken = await auth.verifyIdToken(idToken);
        req.user = decodedIdToken;
        next();
        return;
    } catch (error) {
        console.error('Error while verifying Firebase ID Token: ', error);
        return res.status(httpStatusCodes.forbidden).json({
            error: 'Unauthorized',
        });
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