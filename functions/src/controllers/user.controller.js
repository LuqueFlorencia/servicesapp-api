const { getSuccessResponseObject } = require('../utils/utils');
const { httpStatusCodes } = require('../utils/errores');
const service = require('../services/user.service');

// PUT /users/:uid
async function upsertUser (req, res) {
    const dni = req.params.uid;
    const data = await service.updateProfileByDni(dni, req.body);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Perfil actualizado.'
    ));
};

// GET /users/:uid
async function getUser (req, res) {
    const dni = req.params.uid;
    const data = await service.getUserByDni(dni);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Usuario obtenido.'
    ));
};

// PATCH /users/:uid/personal
async function updatePersonalData (req, res) {
    const dni = req.params.uid;
    const personalData = req.body;
    const data = await service.updatePersonalByDni(dni, personalData);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Datos personales actualizados.'
    ));
};

// PATCH /users/:uid/role
async function updateUserRole (req, res) {
    const dni = req.params.uid;
    const { role } = req.body;
    const data = await service.updateRoleByDni(dni, role);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Rol actualizado.'
    ));
};

// GET /users ~ Filtros opcionales: ?role=pro&city=Resistencia&province=Chaco
async function listUsers (req, res) {
    const filters = req.query;
    const data = await service.listUsers(filters);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Usuarios obtenidos.'
    ));
};

// PATCH /users/:uid/status
async function updateUserStatus (req, res) {
    const dni = req.params.uid;
    const { is_deleted } = req.body;
    const data = await service.updateStatusByDni(dni, is_deleted);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Estado actualizado.'
    ));
};

module.exports = { 
    upsertUser,
    getUser,
    updatePersonalData,
    updateUserRole, 
    listUsers,
    updateUserStatus,
}
