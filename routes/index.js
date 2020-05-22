const router = require('express').Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const { registerValidation, loginValidation } = require('../validators.js');
const { isPublic, isPrivate } = require('../middlewares/checkAuth');

// Get homepage
router.get('/', isPublic, (req, res) => {
  console.log("Read home successful!");
  var param = "";
  postController.getAllPosts(param, (posts) => {
    res.render('home', {item: posts})
  });
});

// View All Post
router.get('/feed', isPublic, (req, res) => {
  console.log("Read feed successful!");
  var param = "";
  postController.getAllPosts(param, (posts) => {
    res.render('feed', { item: posts})
  });
});

// Get login page
router.get('/login', isPublic, (req, res) => {
  console.log("Read login successful!");
  res.render('login');
});

// Logout
router.get('/logout', isPrivate, userController.logoutUser);

// Get register page
router.get('/register', isPublic, (req, res) => {
  console.log("Read register successful!");
  res.render('register');
});

// Get myprofile page
router.get('/myprofile', isPrivate, (req, res) => {
  console.log("Read myprofile successful!");
  res.render('myprofile', { username: req.session.username } );
});
// Get donate page
router.get('/donate', isPublic, (req, res) => {
  console.log("Read donation page successful!");
  res.render('donate');
});

// POST methods for form submissions
router.post('/searchPost', isPublic, (req,res) => {
  var param = req;
  postController.searchPost(param, (posts) => {
  res.render('feed',{item: posts})
  });
});




router.post('/register', isPublic, registerValidation, userController.registerUser);
router.post('/login', isPublic, loginValidation, userController.loginUser);

module.exports = router;