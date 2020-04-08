
const router = require('express').Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const { registerValidation, loginValidation } = require('../validators.js');
const { isPublic, isPrivate } = require('../middlewares/checkAuth');

const postModel = require('../models/post');

console.log("index main");

// Posts


console.log("index.js");



/*
// Inserting to DB
userModel.collection.insertMany(userArray, function(err, res){
  if(err) throw err;
  console.log("Insert Users Successful!");

  for (i =0 ; i<postArray.length;i ++){
  // assigns different post for different users... posts are distributed to the predefined users
    if(i<3)
      var owner_id = res.insertedIds[0];
    else if (i>=3 && i<5)
      var owner_id = res.insertedIds[1];
    else
      var owner_id = res.insertedIds[2];
  
    const post = new postModel({
      img: postArray[i].img,
      header: postArray[i].header,
      caption: postArray[i].caption,
      tags: postArray[i].tags,
      owner: owner_id
    });

    post.save(function (err, result) {
      if (err) throw err;
      console.log(result);
    });      
  }
});
*/

// Get homepage
router.get('/', isPublic, (req, res) => {
  var param = "Save Pandas";
  postController.getAllPosts(param, (posts) => {
    res.render('home', {item: posts,})
  });
  
});


// View All Post

router.get('/feed', isPublic, (req, res) => {
  var param = "";
  postController.getAllPosts(param, (posts) => {
    res.render('feed', {item: posts,})
  });
  
});
/*
// Search A Post
app.post('/searchPost', function(req, res) {
  var search = req.body.title;
  console.log(search);
  //make function find
  postModel.find({ header: { $regex: search, $options:'i' } }, function(err, posts) {
    if(err) throw err;
    console.log(posts);  // checker,del after

    res.render('partials/card', {item: posts}, function(err, html) {
      res.send(html);
    })
    /*
    res.render('feed', {
      item: post,
    });
    
  });
});
*/

// Get login page
router.get('/login', isPublic, (req, res) => {
  console.log("Read login successful!");
  res.render('login', {
    pageTitle: 'Login',
  });
  console.log("login");
});

// Logout
router.get('/logout', isPrivate, userController.logoutUser);

// Get register page
router.get('/register', isPublic, (req, res) => {
  console.log("Read register successful!");
  res.render('register', {
    pageTitle: 'Register',
  });
  console.log("register");
});

// Get myprofile page
router.get('/myprofile', isPrivate, (req, res) => {
  console.log("Read myprofile successful!");
  res.render('myprofile', { username: req.session.username } );
  console.log("myprofile");
});
// Get donate page
router.get('/donate', isPublic, (req, res) => {
  console.log("Read login successful!");
  res.render('donate', {
    pageTitle: 'Donation Page',
  });
  console.log("Donation Page");
});

// POST methods for form submissions
router.post('/register', isPublic, registerValidation, userController.registerUser);
router.post('/login', isPublic, loginValidation, userController.loginUser);

module.exports = router;