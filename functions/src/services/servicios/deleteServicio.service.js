const  { deleteService } = require('../../repositories/service.repository');

async function deleteServiceId(categoryId, serviceId) {
  const deleted = await deleteService(categoryId, serviceId);
  return deleted;
}

module.exports = {
  deleteServiceId,
};