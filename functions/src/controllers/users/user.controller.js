const { getSuccessResponseObject } = require('../../utils/utils');
const { httpStatusCodes } = require('../../utils/errores');
const service = require('../../services/services');

/* ===== CRUD BASICO ===== */

// PATCH /users/me/personal
async function updateMyPersonalData(req, res) {
    const uid = req.user.uid;
    const personal = req.body;

    const data = await service.updatePersonalProfile(uid, { personal });

    return res.status(httpStatusCodes.ok).json(
        getSuccessResponseObject(data, httpStatusCodes.ok, 'OK', 'Perfil actualizado.')
    );
};

// PUT /users/:dni
async function updateUser (req, res) {
    const dni = req.params.dni;
    const data = await service.updateExistingUserByDni(dni, req.body);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Perfil actualizado.'
    ));
};

// GET /users/:dni
async function getUser (req, res) {
    const dni = req.params.dni;
    const data = await service.getUserByDni(dni);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Usuario obtenido.'
    ));
};

// PATCH /users/:dni/personal
async function updatePersonalData (req, res) {
    const dni = req.params.dni;
    const personalData = req.body;
    const data = await service.updatePersonalByDni(dni, personalData);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Datos personales actualizados.'
    ));
};

// PATCH /users/:dni/role
async function updateUserRole (req, res) {
    const dni = req.params.dni;
    const { role } = req.body;
    const data = await service.updateRoleByDni(dni, role);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Rol actualizado.'
    ));
};

// GET /users ~ Filtros opcionales: ?role=pro&city=Resistencia&province=Chaco&active=true
async function listUsers (req, res) {
    const filters = req.query;
    const data = await service.listUsers(filters);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Usuarios obtenidos.'
    ));
};

// PATCH /users/:dni/status
async function updateUserStatus (req, res) {
    const dni = req.params.dni;
    const { is_deleted } = req.body;
    const data = await service.updateStatusByDni(dni, is_deleted);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Estado actualizado.'
    ));
};

module.exports = { 
    updateMyPersonalData,
    updateUser,
    getUser,
    updatePersonalData,
    updateUserRole, 
    listUsers,
    updateUserStatus
};
