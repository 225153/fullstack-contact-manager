const contact = require("../models/contact");
const mult = require("multer");
const route = require("express").Router();
const auth = require("../middleware/auth");
const path = require("path");

const uploadroute = mult.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = mult({
  storage: uploadroute,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

//add contact
route.post("/addcontact", auth, upload.single("image"), (req, res) => {
  let data = req.body;
  let newcontact = new contact(data);
  newcontact.idUser = req.userId;
  if (req.file) {
    newcontact.image = req.file.path.replace(/\\/g, "/");
  }
  newcontact
    .save()
    .then(() => {
      res.status(200).send({ msg: "contact added", contact: newcontact });
    })
    .catch((err) => {
      console.log("Error adding contact:", err);
      res
        .status(400)
        .send({ msg: "error adding contact", err: err.message || err });
    });
});

route.get("/getcontactsuser/:idUser", auth, (req, res) => {
  let idUser = req.params.idUser;
  if (req.userId !== idUser) {
    return res
      .status(403)
      .send({ msg: "Access denied. You can only view your own contacts." });
  }
  contact
    .find({ idUser: idUser })
    .then((contacts) => {
      res.status(200).send({ msg: "contacts found", contacts });
    })
    .catch((err) => {
      res.status(400).send({ msg: "error getting contacts", err });
    });
});

route.get("/getcontact/:id", auth, (req, res) => {
  let id = req.params.id;
  contact
    .findById(id)
    .then((foundContact) => {
      if (!foundContact) {
        return res.status(404).send({ msg: "Contact not found" });
      }
      if (foundContact.idUser !== req.userId) {
        return res
          .status(403)
          .send({ msg: "Access denied. This is not your contact." });
      }
      res.status(200).send({ msg: "contact found", contact: foundContact });
    })
    .catch((err) => {
      res.status(400).send({ msg: "error getting contact", err });
    });
});

route.put("/updatecontact/:id", auth, upload.single("image"), (req, res) => {
  let id = req.params.id;
  let data = req.body;
  if (req.file) {
    data.image = req.file.path.replace(/\\/g, "/");
  }
  contact
    .findById(id)
    .then((foundContact) => {
      if (!foundContact) {
        return res.status(404).send({ msg: "Contact not found" });
      }
      if (foundContact.idUser !== req.userId) {
        return res.status(403).send({
          msg: "Access denied. You can only update your own contacts.",
        });
      }
      return contact.findByIdAndUpdate(id, data, { new: true });
    })
    .then((updatedContact) => {
      res.status(200).send({ msg: "contact updated", contact: updatedContact });
    })
    .catch((err) => {
      res.status(400).send({ msg: "error updating contact", err });
    });
});

route.delete("/deletecontact/:id", auth, (req, res) => {
  let id = req.params.id;
  contact
    .findById(id)
    .then((foundContact) => {
      if (!foundContact) {
        return res.status(404).send({ msg: "Contact not found" });
      }
      if (foundContact.idUser !== req.userId) {
        return res.status(403).send({
          msg: "Access denied. You can only delete your own contacts.",
        });
      }
      return contact.findByIdAndDelete(id);
    })
    .then(() => {
      res.status(200).send({ msg: "contact deleted" });
    })
    .catch((err) => {
      res.status(400).send({ msg: "error deleting contact", err });
    });
});

module.exports = route;
