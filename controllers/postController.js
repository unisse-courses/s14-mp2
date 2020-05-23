const postModel = require('../models/post');

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