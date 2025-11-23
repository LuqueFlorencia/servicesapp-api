const repo = require('../../repositories/repositories');
const { BadRequestError } = require('../../utils/errores');

/** Activa o cambia el plan premium (solo admin).
 * - Siempre deja active=true, paused=false
 * - Cambia plan al recibido
 * - since: el enviado o Date.now() si viene null/undefined
 */
async function activatePremiumByDni(dni, { plan, since }) {
    const uid = await repo.getUidByDni(dni);
    const user = await repo.getUserDataId(uid);

    const premium = user.premium || {};

    const payload = {
        premium: {
            ...premium,
            plan,
            active: true,
            paused: false,
            since: since ?? Date.now(),
        }
    };

    const updated = await repo.updateProfileByUid(uid, payload);
    return updated;
};

/** Pausa o reanuda el plan premium.
 * - paused=true  => active=false
 * - paused=false => active=true
 */
async function setPremiumPausedByDni(dni, paused) {
    const uid = await repo.getUidByDni(dni);
    const user = await repo.getUserDataId(uid);

    const premium = user.premium || {
        active: false,
        plan: 'standard',
        paused: false,
        since: null,
    };

    // Intentar pausar un plan que nunca fue activado
    if (!premium.active && !premium.paused && paused) 
        throw new BadRequestError('No se puede pausar un plan premium que aún no está activo.');

    if (paused) {
        // Pausar
        if (premium.paused)
            throw new BadRequestError('El plan premium ya está pausado.');

        premium.paused = true;
        premium.active = false;
    } else {
        // Reanudar
        if (!premium.paused)
            throw new BadRequestError('El plan premium no está pausado.');

        premium.paused = false;
        premium.active = true;
    };

    const payload = { premium };

    const updated = await repo.updateProfileByUid(uid, payload);
    return updated;
};

module.exports = { activatePremiumByDni, setPremiumPausedByDni, }