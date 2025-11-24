const repo = require('../../repositories/repositories');
const { AuthorizationError, BadRequestError } = require('../../utils/errores');

async function addProfessionalRating(dni, score, raterUid) {
    const proUid = await repo.getUidByDni(dni);

    // Evitar que alguien se califique a sí mismo
    if (proUid === raterUid) throw new AuthorizationError('No puedes calificarte a ti mismo.');

    // Verificar que el usuario tenga rol profesional
    const proUser = await repo.getUserDataId(proUid);
    if (proUser.role !== 'pro') throw new BadRequestError('Solo se puede calificar a usuarios con rol "pro".');

    const updatedUser = await repo.addRatingByUid(proUid, score);

    return updatedUser;
};

// Obtener los datos de ranking de un profesional por su dni
async function getProfessionalRating(dni) {
    const proUid = await repo.getUidByDni(dni);
    const rating = await repo.getRatingByUid(proUid);
    return rating;
};

// Listar servicios de un profesional
async function getProfessionalServices(dni) {
    const uid = await repo.getUidByDni(dni);
    const user = await repo.getUserDataId(uid);

    if (user.role !== 'pro') 
        throw new BadRequestError('Solo los usuarios con rol "pro" tienen servicios asociados.');

    const services = user.services || {};
    // Agregar busqueda a repo de services cuando este implementado el metodo para traer el resto de la data => Armar objeto personalizado 
    return { services, id: uid };
};

// Agregar un servicio existente a un profesional
async function addServiceToProfessional(dni, categoryId, serviceId) {
    const uid = await repo.getUidByDni(dni);
    const user = await repo.getUserDataId(uid);

    if (user.role !== 'pro')
        throw new BadRequestError('Solo se pueden agregar servicios a usuarios con rol "pro".');

    // Vvalidar que el servicio exista
    await repo.ensureServiceExists(categoryId, serviceId);

    const updated = await repo.addServiceForPro(uid, categoryId, serviceId);
    return updated;
};

// Quitar un servicio del profesional
async function removeServiceFromProfessional(dni, categoryId, serviceId) {
    const uid = await repo.getUidByDni(dni);
    const user = await repo.getUserDataId(uid);

    if (user.role !== 'pro')
        throw new BadRequestError('Solo se pueden quitar servicios de usuarios con rol "pro".');

    const updated = await repo.removeServiceForPro(uid, categoryId, serviceId);
    return updated;
};

// Listar profesionales con filtros -city, province, minRate, minRateCount, categoryId, serviceId-
async function listProfessionals(filters) {
    const pros = await repo.listProfessionalsRepo(filters);
    return pros;
};

module.exports = { 
    addProfessionalRating, 
    getProfessionalRating, 
    getProfessionalServices,
    addServiceToProfessional,
    removeServiceFromProfessional,
    listProfessionals,
};