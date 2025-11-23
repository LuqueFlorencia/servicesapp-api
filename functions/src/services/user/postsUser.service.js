const repo = require('../../repositories/repositories');
const { AuthorizationError, DataValidationError } = require('../../utils/errores');

async function addProfessionalRating(dni, score, raterUid) {
    const proUid = await repo.getUidByDni(dni);

    // Evitar que alguien se califique a sí mismo
    if (proUid === raterUid) throw new AuthorizationError('No puedes calificarte a ti mismo.');

    // Verificar que el usuario tenga rol profesional
    const proUser = await repo.getUserDataId(proUid);
    if (proUser.role !== 'pro') throw new DataValidationError('Solo se puede calificar a usuarios con rol "pro".');

    const updatedUser = await repo.addRatingByUid(proUid, score);

    return updatedUser;
};

module.exports = { addProfessionalRating };