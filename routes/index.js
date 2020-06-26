const router = require('express').Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const { registerValidation, loginValidation, postValidation } = require('../validators.js');
const { loggedIn, loggedOut } = require('../middlewares/checkAuth');

// Get Homepage
router.get('/', (req, res) => {
  console.log("Read home successful!");

  if(req.session.user) {  // if there's a user
    var owner; 

    userController.getID(req.session.user, (user) => {
      owner = user;
    });

    postController.getFeaturedPosts(req, (posts) => {
      res.render('home', { 
        item: posts,
        username: req.session.username, 
        dp: owner.dp,
        _id: req.session.user
      })
    });
  }
  else {
    postController.getFeaturedPosts(req, (posts) => {
      res.render('home', { 
        item: posts, 
      })
    });
  }
});

// View All Post
router.get('/feed', (req, res) => {
  console.log("Read feed successful!");

  if(req.session.user) {
    var owner; 

    userController.getID(req.session.user, (user) => {
      owner = user;
    });

    postController.getAllPosts(req, (posts) => {
      res.render('feed', { 
        item: posts,
        username: req.session.username, 
        dp: owner.dp,
        _id: req.session.user
      })
    });
  }
  else {
    postController.getAllPosts(req, (posts) => {
      res.render('feed', { 
        item: posts
      })
    });
  }
});

// Getting id of the post user wants to view
router.get('/post/view/:id', (req, res) => {
  console.log("Read view successful!");

  if(req.session.user) {
    var owner; 

    userController.getID(req.session.user, (user) => {
      owner = user;
    });

    postController.getID(req, (post) => {
      res.render('view', { 
        item: post,
        username: req.session.username, 
        dp: owner.dp,
        _id: req.session.user  
      });
    });
  }
  else {
    postController.getID(req, (post) => {
      res.render('view', { 
        item: post 
      });
    });
  }
});

// Get register page
router.get('/register', loggedOut, (req, res) => {
  console.log("Read register successful!");
  res.render('register');
});

// Get login page
router.get('/login', loggedOut, (req, res) => {
  console.log("Read login successful!");
  res.render('login');
});

// Logout
router.get('/logout', loggedIn, userController.logoutUser);

// Get profile page
router.get('/profile', loggedIn, (req, res) => {
  console.log("Read profile successful!");
  var owner; 

  userController.getID(req.session.user, (user) => {
    owner = user;
  });
  
  postController.getSavedPosts(req.session.user, (posts) => {
    res.render('profile', { 
      username: req.session.username, 
      item: posts, 
      dp: owner.dp, 
      bio: owner.bio, 
      _id: req.session.user 
    });
  });
});

// Get edit profile page
router.get('/profile/edit/:id', loggedIn, (req, res) => {
  console.log("Read edit profile successful!");
  userController.getID(req.session.user, (result) => {
    res.render('bio', { 
      username: req.session.username, 
      bio: result.bio, 
      dp: result.dp 
    });
  });
});

// Get create post page
router.get('/post/create', loggedIn, (req, res) => {
  console.log("Read create page successful!");

  userController.getID(req.session.user, (user) => {
    res.render('create', { 
      username: req.session.username, 
      dp: user.dp 
    });
  });
});

// Getting id of the post user wants to edit
router.get('/post/edit/:id', loggedIn, (req, res) => {
  var owner; 
  
  userController.getID(req.session.user, (user) => {
    owner = user;
  });

  postController.getID(req, (post) => {
    var tags = post.tags.join(" ");
    res.render('edit', { 
      username: req.session.username, 
      item: post, 
      Tags: tags, 
      dp: owner.dp 
    });
  });
});

// Delete post
router.get('/post/delete/:id', loggedIn, postController.delete);

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

// POST methods for form submissions
router.post('/post/search', (req, res) => {
  if(req.session.user) {
    var owner; 

    userController.getID(req.session.user, (user) => {
      owner = user;
    });

    postController.searchPost(req, (posts) => {
      res.render('feed', { 
        item: posts,
        username: req.session.username, 
        dp: owner.dp,
        _id: req.session.user
      })
    });
  }
  else {
    postController.searchPost(req, (posts) => {
      res.render('feed', { 
        item: posts
      })
    });
  }
});

router.post('/makePost', loggedIn, upload, postValidation, postController.generatePosts);
router.post('/register', loggedOut, registerValidation, userController.registerUser);
router.post('/login', loggedOut, loginValidation, userController.loginUser);
router.post('/post/edit', loggedIn, upload, postValidation, postController.edit);
router.post('/profile/edit', loggedIn, upload,userController.edit);

module.exports = router;