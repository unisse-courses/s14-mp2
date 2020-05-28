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
// we can add more validation factors if we want to

const loginValidation = [
  // Username should not be empty
  body('username').not().isEmpty().withMessage("Please enter username."),
  // Password should not be empty
  body('password').not().isEmpty().withMessage("Please enter password.")
];

const postValidation = [
  body('image').notEmpty().withMessage("Please insert a photo"),
  // Title should not be empty
  body('header').not().isEmpty().withMessage("Please enter title"),
  body('caption').not().isEmpty().withMessage("Please enter description for the post."),  
  // Tags should not be empty
  body('tags').not().isEmpty().withMessage("Please enter Tags for the post."), 
];

module.exports = { registerValidation, loginValidation, postValidation };