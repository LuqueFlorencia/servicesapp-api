const primitives = require("./joi.primitives");
const users = require("./user/user.schema");
const professionals = require("./user/professional.schema");
const appointments = require("../services/appointments/appointment.schema");
const appointmentValidations = require("./appointments.validations");

module.exports = {
  ...primitives,
  ...users,
  ...professionals,
  ...appointments,
  ...appointmentValidations,
};
