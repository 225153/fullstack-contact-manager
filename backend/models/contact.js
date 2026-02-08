const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String, required: false },
  adress: { type: String, required: false },
  idUser: { type: String, ref: "User", required: true },
});

// Compound unique indexes: email and phone must be unique per user
contactSchema.index({ email: 1, idUser: 1 }, { unique: true });
contactSchema.index({ phone: 1, idUser: 1 }, { unique: true });

const contact = mongoose.model("Contact", contactSchema);

module.exports = contact;
