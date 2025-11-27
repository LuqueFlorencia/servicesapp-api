const { createServiceDatabase } = require('../../repositories/service.repository');

async function createServiceData(categoryId,payload) {
  const created = await createServiceDatabase(categoryId, payload);
  return created;
};

module.exports = { createServiceData };   