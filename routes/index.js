const router = require('express').Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const { registerValidation, loginValidation, postValidation } = require('../validators.js');
const { isPublic, isPrivate } = require('../middlewares/checkAuth');

// Get Homepage
router.get('/', isPublic, (req, res) => {
  console.log("Read home successful!");
  postController.getFeaturedPosts(req, (posts) => {
    res.render('home', { item: posts })
  });
});

// View All Post
router.get('/feed', isPublic, (req, res) => {
  console.log("Read feed successful!");
  postController.getAllPosts(req, (posts) => {
    res.render('feed', { item: posts })
  });
});

// Getting id of the post user wants to view
router.get('/post/view/:id', isPublic, (req, res) => {
  console.log("Read view successful!");
  postController.getID(req, (post) => {
    res.render('view', { item: post });
  });
});

// Get donate page
router.get('/post/donate/:id', isPublic, (req, res) => {
  console.log("Read donation page successful!");
  postController.getID(req, (post) => {
    res.render('donate', { item: post });
  });
});

// Get register page
router.get('/register', isPublic, (req, res) => {
  console.log("Read register successful!");
  res.render('register');
});

// Get login page
router.get('/login', isPublic, (req, res) => {
  console.log("Read login successful!");
  res.render('login');
});

// Logout
router.get('/logout', isPrivate, userController.logoutUser);

// Get profile page
router.get('/profile', isPrivate, (req, res) => {
  console.log("Read profile successful!");
  var owner; 
  userController.getID(req.session.user, (user) => {
    owner = user;
  });
  
  postController.getSavedPosts(req.session.user, (posts) => {
    res.render('profile', { username: req.session.username, item: posts, dp: owner.dp, bio: owner.bio, _id: req.session.user });
  });
});

// Get profile page
router.get('/profile/edit/:id', isPrivate, (req, res) => {
  console.log("Read edit profile successful!");
  userController.getID(req.session.user, (result) => {
    res.render('bio', { username: req.session.username, bio: result.bio, dp: result.dp });
  });
});

// Get create post page
router.get('/post/create', isPrivate, (req, res) => {
  console.log("Read create page successful!");
  var owner; 
  userController.getID(req.session.user, (user) => {
    owner = user;
  });
  
  postController.getSavedPosts(req.session.user, (posts) => {
    res.render('create', { username: req.session.username, item: posts, dp: owner.dp, bio: owner.bio, _id: req.session.user });
  });
});

// Getting id of the post user wants to edit
router.get('/post/edit/:id', isPrivate, (req, res) => {
  postController.getID(req, (post) => {
    var tags = post.tags.join(" ");
    res.render('edit', { username: req.session.username, item: post, Tags: tags });
  });
});

// Delete post
router.get('/post/delete/:id', isPrivate, postController.delete);

// POST methods for form submissions
router.post('/post/search', isPublic, (req, res) => {
  postController.searchPost(req, (posts) => {
  res.render('feed', { item: posts })
  });
});




const multer  = require('multer')
const storage = multer.diskStorage({ 
  destination: './public/img/',
  filename: function(req, file, cb){
    cb(null,file.originalname);
  }
});

const upload = multer({
  storage: storage,
}).single('image');


router.post('/makePost', isPrivate,upload, postController.generatePosts);
router.post('/register', isPublic, registerValidation, userController.registerUser);
router.post('/login', isPublic, loginValidation, userController.loginUser);
router.post('/post/edit', isPrivate, upload, postController.edit);
router.post('/profile/edit', isPrivate, upload,userController.edit);

module.exports = router;