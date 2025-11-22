const { getSuccessResponseObject } = require('../utils/utils');
const { httpStatusCodes } = require('../utils/httpsStatusCode');
const service = require('../services/user.service');

/**
 * PUT /users/:uid
 * Crea o actualiza un usuario completo (role, email, personal, premium opcional).
 */
async function upsertUser (req, res) {
    const uid = req.user.uid;

    const payload = {
        ...req.body,
        email: req.user.email || req.body.email,
    };

    const data = await service.updateMyProfile(uid, payload);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Perfil actualizado.'
    ));
};

/**
 * GET /users/:uid
 * Devuelve el usuario completo.
 */
async function getUser (req, res) {
    const dni = req.params.uid;
    const data = await service.getUserByDni(dni);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Usuario obtenido.'
    ));
};

module.exports = { 
    upsertUser,
    getUser,
}
