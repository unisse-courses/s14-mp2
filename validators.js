const { body } = require('express-validator');
const registerValidation = [
  // Email should not be empty and valid
  body('email').not().isEmpty().withMessage("Please enter email.")
    .isEmail().withMessage("Please enter valid email."),

  // Name should not be empty
  body('username').not().isEmpty().withMessage("Please enter username."),  

  // Password needs to be min 6 chars
  body('password').not().isEmpty().withMessage("Please enter password.")
  .isLength({ min: 6 }),

  // Confirm Password needs to be min 6 chars AND must match the req.body.password field
  body('confirmPass').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long.")
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

const postValidation = [
  // Image is required
  //body('image').notEmpty().withMessage("Please insert a photo."),

  // Title should not be empty
  body('header').not().isEmpty().withMessage("Please enter title.")
  .isLength({ max: 30 }).withMessage("Title has exceeded the character limit."),

  // Description should not be empty
  body('caption').not().isEmpty().withMessage("Please enter description.")
  .isLength({ max: 500 }).withMessage("Description has exceeded the character limit."), 

  // Tags should not be empty
  body('tags').not().isEmpty().withMessage("Please enter tags."), 
];

module.exports = { registerValidation, loginValidation, postValidation };