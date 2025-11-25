const {
  getServiceDataId,
  getServicesByCategory,
} = require('../../repositories/service.repository');


async function getServiceById(categoryId, serviceId) {
  const service = await getServiceDataId(categoryId, serviceId);
  return service;
}


async function getServices(categoryId) {
  const services = await getServicesByCategory(categoryId);
  return services;
}

module.exports = {
  getServiceById,
  getServices,
};