const createAppointment = require("./createAppointment.service");
const getAppointment = require("./getAppointment.service");
const updateAppointment = require("./updateAppointment.service");
const { getDailyAppointments } = require("./getDailyAppointments.service");
const {
  updateAppointmentState,
  updateAppointmentFull,
} = require("./updateAppointment.service");
const {
  deleteAppointmentLogical,
  deleteAppointmentPhysical,
} = require("./deleteAppointment.service");
const { getMyAppointments } = require("./getMyAppointments.service");
const {
  getAppointmentsByDateRange,
} = require("./getAppointmentsByDateRange.service");

module.exports = {
  ...createAppointment,
  ...getAppointment,
  ...updateAppointment,
  updateAppointmentState,
  updateAppointmentFull,
  deleteAppointmentLogical,
  deleteAppointmentPhysical,
  getMyAppointments,
  getAppointmentsByDateRange,
  getDailyAppointments,
};
