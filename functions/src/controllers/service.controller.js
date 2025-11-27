const { getSuccessResponseObject } = require('../utils/utils');
const { httpStatusCodes } = require('../utils/errores');
const service = require('../services/service.service');

// POST /services/:categoryId
async function createService(req, res) {
  const { categoryId } = req.params;
  const payload = req.body;

  const data = await service.createService(categoryId, payload);

  return res.status(httpStatusCodes.ok).json(
    getSuccessResponseObject(data, httpStatusCodes.ok, 'OK', 'Servicio creado.')
  );
}

// GET /services/:categoryId
async function listServices(req, res) {
  const { categoryId } = req.params;
  const filters = req.query;

  const data = await service.listServices(categoryId, filters);

  return res.status(httpStatusCodes.ok).json(
    getSuccessResponseObject(data, httpStatusCodes.ok, 'OK', 'Servicios obtenidos.')
  );
}

// GET /services/:categoryId/:serviceId
async function getService(req, res) {
  const { categoryId, serviceId } = req.params;

  const data = await service.getServiceById(categoryId, serviceId);

  return res.status(httpStatusCodes.ok).json(
    getSuccessResponseObject(data, httpStatusCodes.ok, 'OK', 'Servicio obtenido.')
  );
}

// PATCH /services/:categoryId/:serviceId
async function updateService(req, res) {
  const { categoryId, serviceId } = req.params;
  const payload = req.body;

  const data = await service.updateServiceById(categoryId, serviceId, payload);

  return res.status(httpStatusCodes.ok).json(
    getSuccessResponseObject(data, httpStatusCodes.ok, 'OK', 'Servicio actualizado.')
  );
}

// DELETE /services/:categoryId/:serviceId
async function deleteService(req, res) {
  const { categoryId, serviceId } = req.params;

  const data = await service.deleteServiceById(categoryId, serviceId);

  return res.status(httpStatusCodes.ok).json(
    getSuccessResponseObject(data, httpStatusCodes.ok, 'OK', 'Servicio eliminado.')
  );
}

module.exports = {
  createService,
  listServices,
  getService,
  updateService,
  deleteService,
};
