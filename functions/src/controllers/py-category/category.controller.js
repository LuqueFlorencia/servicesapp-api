const { getSuccessResponseObject } = require('../../utils/utils');
const { httpStatusCodes } = require('../../utils/errores');
const { getCategoriesService } = require('../../services/py-category/category.service');

async function getCategoriesFromPy(req, res, next) {
    const categories = await getCategoriesService();
    return res.status(httpStatusCodes.ok).json(getSuccessResponseObject(
        categories, httpStatusCodes.ok, 'OK', 'Categorias de servicio externo obtenidas.'));
};

module.exports = { getCategoriesFromPy };
