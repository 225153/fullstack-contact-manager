const { body, validationResult } = require("express-validator");

// Register validation
const validateRegister = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 20 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Name must be 3-20 alphanumeric characters"),
  body("lastname")
    .trim()
    .isLength({ min: 3, max: 20 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Last name must be 3-20 alphanumeric characters"),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Must be a valid email"),
  body("password")
    .isLength({ min: 6, max: 20 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/)
    .withMessage("Password must contain uppercase, lowercase, and number"),
];

// Login validation
const validateLogin = [
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Must be a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Check validation results
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ msg: "Invalid input", errors: errors.array() });
  }
  next();
};

module.exports = { validateRegister, validateLogin, checkValidation };
