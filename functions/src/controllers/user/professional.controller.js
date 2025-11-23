const { getSuccessResponseObject } = require('../../utils/utils');
const { httpStatusCodes } = require('../../utils/errores');
const service = require('../../services/services');

/* ===== RATING DE PROFESIONALES ===== */

// POST /users/:dni/rating
async function rateProfessional (req, res) {
    const dniPro = req.params.dni;
    const { score } = req.body;
    const raterUid = req.user.uid;

    const data = await service.addProfessionalRating(dniPro, score, raterUid);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Calificación registrada.')
    );
};

// GET /users/:dni/rating
async function getProfessionalRating(req, res) {
    const dniPro = req.params.dni;
    const data = await service.getProfessionalRating(dniPro);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Rating del profesional obtenido.')
    );
};

// GET /users/professionals ~ Filtros opcionales: ?city=Resistencia&province=Chaco&minRating=5&minRatingCount=50&categoryId=1
async function listProfessionals(req, res) {
    const filters = req.query;
    const data = await service.listProfessionals(filters);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Profesionales obtenidos.')
    );
};

// GET /users/:dni/services
async function getProfessionalServices(req, res) {
    const dni = req.params.dni;
    const data = await service.getProfessionalServices(dni);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Servicios del profesional obtenidos.')
    );
};

// POST /users/:dni/services
async function addServiceToProfessional(req, res) {
    const dni = req.params.dni;
    const { categoryId, serviceId } = req.body;
    const data = await service.addServiceToProfessional(dni, categoryId, serviceId);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Servicio agregado al profesional.')
    );
};

// DELETE /users/:dni/services/:categoryId/:serviceId
async function removeServiceFromProfessional(req, res) {
    const { dni, categoryId, serviceId } = req.params;
    const data = await service.removeServiceFromProfessional(dni, categoryId, serviceId);

    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        data, httpStatusCodes.ok, 'OK', 'Servicio removido del profesional.')
    );
};

module.exports = { 
    rateProfessional,
    getProfessionalRating,
    listProfessionals,
    getProfessionalServices,
    addServiceToProfessional, 
    removeServiceFromProfessional,
};