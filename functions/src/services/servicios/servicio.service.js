const getServiceId = require('./getServicio.service');
const deleteService = require('./deleteServicio.service');
const createServiceData = require('./createServicio.service');

module.exports = { 
    ...getServiceId,
    ...deleteService,
    ...createServiceData,
};