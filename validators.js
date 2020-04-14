const { body } = require('express-validator');
const registerValidation = [
  // Email should not be empty and valid
  body('email').not().isEmpty().withMessage("Please enter email.")
    .isEmail().withMessage("Please enter valid email."),

  // Name should not be empty
  body('username').not().isEmpty().withMessage("Please enter username."),  

  // Password needs to be min 5 chars
  body('password').isLength({ min: 5 }).withMessage("Password must be at least 6 characters long."),

  // Confirm Password needs to be min 5 chars AND must match the req.body.password field
  body('confirmPass').isLength({ min: 5 }).withMessage("Password must be at least 6 characters long.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords does not match. Try again.");
      }
      return true;
    })
];

const loginValidation = [
  // Username should not be empty
  body('username').not().isEmpty().withMessage("Please enter username."),
  // Password should not be empty
  body('password').not().isEmpty().withMessage("Please enter password.")
];

const searchPostValidation = [
  // Search 
  body('searchTitle').not().isEmpty().withMessage("Please enter what to search.")
];

module.exports = { registerValidation, loginValidation, searchPostValidation };