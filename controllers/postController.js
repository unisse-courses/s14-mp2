const postModel = require('../models/post');
const { validationResult } = require('express-validator');

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
  console.log("Search input by user: ");
  console.log(query);

  postModel.getTitle({ header: {$regex: query, $options:'i'}}, (err, result) => {
    if (err) {
      req.flash('error_msg', 'Something happened! Please try again.');
      throw err; 
    } 
    else {
      // Successful query
      if (result) { // If posts are found!
        console.log("Search results:");
        console.log(result);
        
        const postObjects = [];
    
        result.forEach(function(doc) {
          postObjects.push(doc.toObject());
        });
        
        res(postObjects);
      } 
      else {  // No post found
        console.log("No post found!");
        req.flash('error_msg', 'No search results found. Try again.');
      }
    }
  });
};




exports.getSavedPosts = (req, res) => {
  var query = req;
  console.log(query);

  postModel.getTitle({ owner: query }, (err, result) => {
    if (err) {
      throw err; 
    } 
    else {
      // Successful query
      if (result) { // If posts are found!
        console.log("Search results:");
        console.log(result);
        
        const postObjects = [];
    
        result.forEach(function(doc) {
          postObjects.push(doc.toObject());
        });
        
        res(postObjects);
      } 
      else {  // No post found
        console.log("No such post for user found!");
      }
    }
  });
  
};



exports.generatePosts = (req, res) => {
  const errors = validationResult(req);
	if (errors.isEmpty()) {
		const { image, header, caption, funds , tags } = req.body;
    const post = {
      img: req.body.image,
      header: req.body.header,
      caption: req.body.caption,
      tags: req.body.tags,
      owner: req.session.user
    };
    console.log(post);

    console.log("you made it here!");

    postModel.createPost(post, function(err, postResult) {
      if (err) {
        req.flash('error_msg', 'Could not create the posts. Please try again.');
        res.redirect('/create');
      } else {
        req.flash('success_msg', 'New post generated!');
        res.redirect('/myprofile');
      }
    }) 
			}
    else {
      console.log("errorrrrs");
		const messages = errors.array().map((item) => item.msg);
		req.flash('error_msg', messages.join(' '));
		res.redirect('/create');
	}

};

// Get post by ID
exports.getID = (req, res) => {
  var id = req.params.id;
  console.log("GETTING POSTID INSIDE POSTCONTROLLER");
  console.log(id);
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
  var id = req.params.id;
  console.log("req.body._id");
  console.log(req.body._id);
  const { header, caption, funds , tags } = req.body;

  var update = {
    $set: { 
      img: req.body.image,
      header: req.body.header,
      caption: req.body.caption,
      tags: req.body.tags,
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
      res.redirect('/myprofile');
    }
  });
};

// Delete post
exports.delete = (req, res) => {
  var id = req.param.id;
  console.log("deletepost object id:");
  console.log(id);
  /*
  postModel.delete(id, (err, result) => {
    if (err) {
      throw err; 
    } 
    else {
      console.log("idk what im doing");
    }
  }); */

};