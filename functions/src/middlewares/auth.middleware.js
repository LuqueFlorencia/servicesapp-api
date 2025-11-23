const { firebaseAdmin } = require('../utils/firebase.js');
const { getAuth } = require('firebase-admin/auth');
const { httpStatusCodes, AuthorizationError, ForbiddenError } = require('../utils/errores.js');
const { getUserDataId } = require('../repositories/user.repository');

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

    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))
        return next(new AuthorizationError('Unauthorized'));

    idToken = req.headers.authorization.split('Bearer ')[1];

    if (idToken !== appToken) { 
        return res.status(httpStatusCodes.forbidden).json({
            error: 'Unauthorized',
        });
    };

    return next();
};

// Solo admin
async function requireAdmin(req, _res, next) {
    try {
        const firebaseUid = req.user.uid;
        const user = await getUserDataId(firebaseUid);

        if (user.role !== 'admin') return next(new ForbiddenError('No autorizado (se requiere rol admin).'));

        return next();
    } catch (err) {
        return next(err);
    }
};

// Puede el propio usuario (por DNI) o un admin
async function allowSelfOrAdminByDni(req, _res, next) {
    try {
        const dniParam = req.params.uid;
        const firebaseUid = req.user.uid;

        const user = await getUserDataId(firebaseUid);

        const isAdmin = user.role === 'admin';
        const isSelf = user.personal?.dni === dniParam;

        if (!isAdmin && !isSelf) return next(new ForbiddenError('No autorizado (solo el propio usuario o admin).'));

        return next();
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    validateFirebaseIdToken,
    validateInternalFirebaseFunctionsToken,
    requireAdmin,
    allowSelfOrAdminByDni,
}