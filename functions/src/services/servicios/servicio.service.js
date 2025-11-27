const getServiceId = require('./getServicio.service');
const deleteService = require('./deleteServicio.service');
const createServiceData = require('./createServicio.service');
const updateService  = require('./updateServicio.service');


module.exports = { 
  ...getServiceId,
  ...deleteService,
  ...createServiceData,
  ...updateService,
};