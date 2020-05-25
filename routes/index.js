const router = require('express').Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const { registerValidation, loginValidation,postValidation } = require('../validators.js');
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

// Get donate page
router.get('/donate', isPublic, (req, res) => {
  console.log("Read donation page successful!");
  res.render('donate');
});

// Get login page
router.get('/login', isPublic, (req, res) => {
  console.log("Read login successful!");
  res.render('login');
});

// Get create post page
router.get('/create', isPrivate, (req, res) => {
  console.log("Read create page successful!");
  res.render('create', { username: req.session.username});
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
  postController.getSavedPosts(req.session.user, (posts) => {
    res.render('myprofile', { username: req.session.username, item: posts});
  });
});

// Getting id of the post user wants to edit
router.get('/post/edit/:id', isPrivate, (req, res) => {
  var id = req.params.id;

  postController.getID(req, (post) => {
    res.render('edit', { username: req.session.username, item: post });
  });
});

// Delete post
router.get('/post/delete/:id', isPrivate, postController.delete);

// POST methods for form submissions
router.post('/searchPost', isPublic, (req,res) => {
  var param = req.params.id;
  postController.searchPost(param, (posts) => {
  res.render('feed',{ item: posts })
  });
});

router.post('/register', isPublic, registerValidation, userController.registerUser);
router.post('/login', isPublic, loginValidation, userController.loginUser);
router.post('/createPost',isPrivate, postValidation, postController.generatePosts);
router.post('/editPost', isPrivate, postController.edit);

module.exports = router;