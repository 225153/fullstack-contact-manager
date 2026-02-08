const user = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const {
  validateRegister,
  validateLogin,
  checkValidation,
} = require("../middleware/validation");
const { registerLimiter, loginLimiter } = require("../middleware/rateLimiter");

//register
router.post(
  "/signup",
  registerLimiter,
  validateRegister,
  checkValidation,
  (req, res) => {
    let data = req.body;
    let newuser = new user(data);
    newuser.password = bcrypt.hashSync(data.password, 10);
    newuser
      .save()
      .then(() => {
        res.status(200).send({ msg: "user registered", user: newuser });
      })
      .catch((err) => {
        res.status(400).send({ msg: "error registering user", err });
      });
  },
);

router.post(
  "/signin",
  loginLimiter,
  validateLogin,
  checkValidation,
  (req, res) => {
    let { email, password } = req.body;
    user
      .findOne({ email: email })
      .then((founduser) => {
        if (founduser) {
          bcrypt.compare(password, founduser.password, (err, result) => {
            if (err) {
              return res
                .status(500)
                .send({ msg: "error comparing passwords", err });
            }
            if (result) {
              let payload = {
                id: founduser._id,
                name: founduser.name,
                lastname: founduser.lastname,
                email: founduser.email,
              };
              let token = jwt.sign(payload, "hedhasecretkey");
              res.status(200).send({ msg: "user signed in", token });
            } else {
              res.status(400).send({ msg: "incorrect password" });
            }
          });
        } else {
          res.status(400).send({ msg: "user not found" });
        }
      })
      .catch((err) => {
        res.status(500).send({ msg: "error signing in", err });
      });
  },
);

module.exports = router;
