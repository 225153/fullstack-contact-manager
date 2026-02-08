const mg = require("mongoose");

const user = mg.model("User", {
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = user;
