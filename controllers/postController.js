const postModel = require('../models/post');
const { validationResult } = require('express-validator');

//Getting featured posts
exports.getFeaturedPosts = (param, callback) =>{
  postModel.getFeatured(param, (err, posts) => {
    if (err) throw err;
    
    const postObjects = [];
    
    posts.forEach(function(doc) {
      postObjects.push(doc.toObject());
    });
    
    callback(postObjects);
  });
};

//Getting all posts
exports.getAllPosts = (param, callback) =>{
  postModel.getAll(param, (err, posts) => {
    if (err) throw err;
    
    const postObjects = [];
    
    posts.forEach(function(doc) {
      postObjects.push(doc.toObject());
    });
    
    callback(postObjects);
  });
};

// Searching post via title
exports.searchPost = (req, res) => {
  var query = req.body.searchTitle;

  postModel.getTitle({ header: {$regex: query, $options:'i'}}, (err, result) => {
    if (err) {
      req.flash('error_msg', 'Something happened! Please try again.');
      throw err; 
    } 
    else {
      if (result) { 
        const postObjects = [];
        result.forEach(function(doc) {
          postObjects.push(doc.toObject());
        });
        res(postObjects);
      } 
      else { 
        console.log("No post found!");
        req.flash('error_msg', 'No search results found. Try again.');
      }
    }
  });
};

// Getting owner's posts
exports.getSavedPosts = (req, res) => {
  var query = req;

  postModel.getTitle({ owner: query }, (err, result) => {
    if (err) {
      throw err; 
    } 
    else {
      if (result) {
        console.log("Posts owned by user:");
        console.log(result);
        const postObjects = [];
    
        result.forEach(function(doc) {
          postObjects.push(doc.toObject());
        });
        
        res(postObjects);
      } 
      else {  // No post found
        console.log("No posts yet!");
      }
    }
  });
};

// Creating post
exports.generatePosts = (req,res) => {
  console.log("value:");
  console.log(req);
  
  const errors = validationResult(req);
	if (errors.isEmpty()) {
    const { image, header, caption, funds , tags } = req.body;

    var folder = "img/"+req.file.originalname;

    if (req.body.tags != ""){
      var tagsArray = getTags(req.body.tags);
    }

    const post = {
      img: folder,
      header: req.body.header,
      caption: req.body.caption,
      tags: tagsArray,
      owner: req.session.user
    };
  
    postModel.createPost(post, function(err, postResult) {
      if (err) {
        req.flash('error_msg', 'Could not create the posts. Please try again.');
        res.redirect('/create');
      } else {
        req.flash('success_msg', 'New post generated!');
        res.redirect('/profile');
      }
    }) 
			}
    else {
      console.log("errorrrrs");
		const messages = errors.array().map((item) => item.msg);
    console.log(messages);
    req.flash('error_msg', messages.join(' '));
		res.redirect('/create');
	}
};

// Get post by ID
exports.getID = (req, res) => {
  var id = req.params.id;

  postModel.getByID(id, (err, result) => {
    if (err) {
      console.log("Could not find post.");
      throw err;
    } else {
      var postObject = result.toObject();
      res(postObject);
    }
  });
};

// Edit post 
exports.edit = (req, res) => {
  const { header, caption, funds , tags } = req.body;

  var folder = "img/"+req.file.originalname;

  if (req.body.tags != ""){
    var tagsArray = getTags(req.body.tags);
  }

  var update = {
    $set: { 
      img: folder,
      header: req.body.header,
      caption: req.body.caption,
      tags: tagsArray,
      owner: req.session.user
    } 
  };
 
  postModel.update(req.body._id, update, (err, result) => {
    if (err) {
      console.log("Something went wrong. Please try again.");
      throw err;
    } else {
      console.log("Post updated!");
      console.log(result);
      res.redirect('/profile');
    }
  });
};

// Delete post
exports.delete = (req, res) => {
  var id = req.params.id;
  
  postModel.remove(id, (err, result) => {
    if (err) {
      throw err; 
    } 
    else {
      console.log("Successfully deleted!");
      res.redirect('/profile');
    }
  }); 
};



function getTags(searchText) {
  var regexp = /#([^\s#]+)/gm
  result = searchText.match(regexp);
  if (result) {
      result = result.map(function(s){ return s.trim();});
      console.log(result);
      return result;
  } else {
      return false;
  }
}