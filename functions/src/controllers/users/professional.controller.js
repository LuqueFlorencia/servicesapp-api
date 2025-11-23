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

module.exports = { 
    rateProfessional,
    getProfessionalRating,
    listProfessionals,
};