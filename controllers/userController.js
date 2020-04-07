const userModel = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.registerUser = (req, res) => {
  const errors = validationResult(req);
	if (errors.isEmpty()) {
		const { email, username, password } = req.body;
		userModel.getOne({ username: username }, (err, result) => {
			if (result) {
				console.log(result);
				req.flash('error_msg', 'Username is already used. Try again.');
				res.redirect('/register');
			} else {
        const saltRounds = 10;
        
				// Hash password
				bcrypt.hash(password, saltRounds, (err, hashed) => {
				  const newUser = {
            email,
					  username,
						password: hashed 
					};

					userModel.create(newUser, (err, user) => {
						if (err) {
							req.flash('error_msg', 'Could not create user. Please try again.');
							res.redirect('/register');
						} else {
              req.flash('success_msg', 'You are now registered! Login below.');
              console.log("List of users [usermodel create usercontroller]");
              console.log(user);
							res.redirect('/login');
						}
					});
				});
			}
    });
	} else {
		const messages = errors.array().map((item) => item.msg);
		req.flash('error_msg', messages.join(' '));
		res.redirect('/register');
	}
};

exports.loginUser = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { username, password } = req.body;
    userModel.getOne({ username: username }, (err, user) => {
      if (err) {
        // Database error occurred...
        req.flash('error_msg', 'Something happened! Please try again.');
        res.redirect('/login');
      } else {
        // Successful query
        if (user) { // If user is found!
          bcrypt.compare(password, user.password, (err, result) => {
            // passwords match (result == true)
            if (result) {
              // Update session object once matched!
              req.session.user = user._id;
              req.session.username = user.username;
              console.log(req.session);
              res.redirect('/myprofile');
            } else {  // If passwords don't match
              req.flash('error_msg', 'Password does not match. Please try again.');
              res.redirect('/login');
            }
          });
        } else {  // No user found
          req.flash('error_msg', 'No registered user with that username. Please register.');
          res.redirect('/register');
        }
      }
    });
  } else {
    const messages = errors.array().map((item) => item.msg);
    req.flash('error_msg', messages.join(' '));
    res.redirect('/login');
  }
};

exports.logoutUser = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/login');
    });
  }
};