const users = require("./user/user.controller");
const professionals = require("./user/professional.controller");
const appointments = require("./appointment.controller");

module.exports = {
  ...users,
  ...professionals,
  ...appointments,
};
