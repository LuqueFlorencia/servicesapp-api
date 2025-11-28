const { getSuccessResponseObject } = require("../utils/utils");
const { httpStatusCodes } = require("../utils/errores");
const service = require("../services/servicios/servicio.service");

// POST 
async function createService(req, res) {
  const { categoryId } = req.params;
  const payload = req.body;

  const data = await service.createServiceData(categoryId, payload);

  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.ok,
        "OK",
        "Servicio creado."
      )
    );
}

// GET 
async function listServices(req, res) {
  const { categoryId } = req.params;
  const filters = req.query;

  const data = await service.getServices(categoryId, filters);

  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.ok,
        "OK",
        "Servicios obtenidos."
      )
    );
}

// GET 
async function getService(req, res) {
  const { categoryId, serviceId } = req.params;

  const data = await service.getServiceById(categoryId, serviceId);

  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.ok,
        "OK",
        "Servicio obtenido."
      )
    );
}

// PATCH 
async function updateService(req, res) {
  const { categoryId, serviceId } = req.params;
  const payload = req.body;

  const data = await service.updateService(categoryId, serviceId, payload);

  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.ok,
        "OK",
        "Servicio actualizado."
      )
    );
}

// DELETE 
async function deleteService(req, res) {
  const { categoryId, serviceId } = req.params;

  const data = await service.deleteServiceId(categoryId, serviceId);

  return res
    .status(httpStatusCodes.ok)
    .json(
      getSuccessResponseObject(
        data,
        httpStatusCodes.ok,
        "OK",
        "Servicio eliminado."
      )
    );
}

module.exports = {
  createService,
  listServices,
  getService,
  updateService,
  deleteService,
};
