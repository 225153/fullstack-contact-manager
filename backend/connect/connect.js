const mg = require("mongoose");

mg.connect("mongodb://localhost:27017/adressbook")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("error connecting to mongodb", err);
  });
