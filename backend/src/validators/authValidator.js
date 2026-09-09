const { body } = require("express-validator");

const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Invalid Email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
];

module.exports = {
  registerValidation
};