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
  
  postModel.getTitle({ header: {$regex: query, $options:'i'}}, { tags: {$regex: query, $options:'i'}}, (err, result) => {
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

  postModel.savedPosts({ owner: query }, (err, result) => {
    if (err) {
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
      else {  // No post found
        console.log("No posts yet!");
      }
    }
  });
};

// Creating post
exports.generatePosts = (req,res) => {
  const errors = validationResult(req);

  if (errors.isEmpty())
  {
    const { image, header, caption, funds , tags, nameBDO,
    numBDO, nameBPI, numBPI, nameMETRO, numMETRO } = req.body;

    var folder = "img/"+req.file.originalname;

    if (req.body.tags != ""){
      var tagsArray = getTags(req.body.tags);
    }

    if(nameBDO != "" && numBDO != "" && nameBPI != "" && numBPI != "" && nameMETRO != "" && numMETRO != ""){
      var post = {
        img: folder,
        header: req.body.header,
        caption: req.body.caption,
        tags: tagsArray,
        BDOaccName: req.body.nameBDO,
        BDOaccNum: req.body.numBDO,
        BPIaccName: req.body.nameBPI,
        BPIaccNum: req.body.numBPI,
        MBaccName: req.body.nameMETRO,
        MBaccNum: req.body.numMETRO,
        owner: req.session.user
      };
    }
    else if(nameBDO == "" && numBDO == "" && nameBPI == "" && numBPI == "" && nameMETRO == "" && numMETRO == ""){
      var post = {
        img: folder,
        header: req.body.header,
        caption: req.body.caption,
        tags: tagsArray,
        BDOaccName: req.body.nameBDO,
        BDOaccNum: req.body.numBDO,
        BPIaccName: req.body.nameBPI,
        BPIaccNum: req.body.numBPI,
        MBaccName: req.body.nameMETRO,
        MBaccNum: req.body.numMETRO,
        owner: req.session.user
      };
      req.flash('error_msg', 'Please enter at least 1 bank account details.');
      res.redirect('/post/create');
    }
    else {
      if(nameBDO == "" || numBDO == ""){
        console.log("BDO is blank");
        if(nameBPI == "" || numBPI == ""){
          var post = {
            img: folder,
            header: req.body.header,
            caption: req.body.caption,
            tags: tagsArray,
            BDOaccName: "N/A",
            BDOaccNum: "N/A",
            BPIaccName: "N/A",
            BPIaccNum: "N/A",
            MBaccName: req.body.nameMETRO,
            MBaccNum: req.body.numMETRO,
            owner: req.session.user
          };
        }
        else if(nameMETRO == "" || numMETRO == ""){
          var post = {
            img: folder,
            header: req.body.header,
            caption: req.body.caption,
            tags: tagsArray,
            BDOaccName: "N/A",
            BDOaccNum: "N/A",
            BPIaccName: req.body.nameBPI,
            BPIaccNum: req.body.numBPI,
            MBaccName: "N/A",
            MBaccNum: "N/A",
            owner: req.session.user
          };
        }
        else{
          var post = {
            img: folder,
            header: req.body.header,
            caption: req.body.caption,
            tags: tagsArray,
            BDOaccName: "N/A",
            BDOaccNum: "N/A",
            BPIaccName: req.body.nameBPI,
            BPIaccNum: req.body.numBPI,
            MBaccName: req.body.nameMETRO,
            MBaccNum: req.body.numMETRO,
            owner: req.session.user
          };
        }
      }

      if(nameBPI == "" || numBPI == ""){
        console.log("BPI is blank");
        if(nameBDO == "" || numBDO == ""){
          var post = {
            img: folder,
            header: req.body.header,
            caption: req.body.caption,
            tags: tagsArray,
            BDOaccName: "N/A",
            BDOaccNum: "N/A",
            BPIaccName: "N/A",
            BPIaccNum: "N/A",
            MBaccName: req.body.nameMETRO,
            MBaccNum: req.body.numMETRO,
            owner: req.session.user
          };
        }
        else if(nameMETRO == "" || numMETRO == ""){
          var post = {
            img: folder,
            header: req.body.header,
            caption: req.body.caption,
            tags: tagsArray,
            BDOaccName: req.body.nameBDO,
            BDOaccNum: req.body.numBDO,
            BPIaccName: "N/A",
            BPIaccNum: "N/A",
            MBaccName: "N/A",
            MBaccNum: "N/A",
            owner: req.session.user
          };
        }
        else{
          var post = {
            img: folder,
            header: req.body.header,
            caption: req.body.caption,
            tags: tagsArray,
            BDOaccName: req.body.nameBDO,
            BDOaccNum: req.body.numBDO,
            BPIaccName: "N/A",
            BPIaccNum: "N/A",
            MBaccName: req.body.nameMETRO,
            MBaccNum: req.body.numMETRO,
            owner: req.session.user
          };
        }
      }

      if(nameMETRO == "" || numMETRO == ""){
        console.log("Metrobank is blank");
        if(nameBDO == "" || numBDO == ""){
          var post = {
            img: folder,
            header: req.body.header,
            caption: req.body.caption,
            tags: tagsArray,
            BDOaccName: "N/A",
            BDOaccNum: "N/A",
            BPIaccName: req.body.nameBPI,
            BPIaccNum: req.body.numBPI,
            MBaccName: "N/A",
            MBaccNum: "N/A",
            owner: req.session.user
          };
        }
        else if(nameBPI == "" || numBPI == ""){
          var post = {
            img: folder,
            header: req.body.header,
            caption: req.body.caption,
            tags: tagsArray,
            BDOaccName: req.body.nameBDO,
            BDOaccNum: req.body.numBDO,
            BPIaccName: "N/A",
            BPIaccNum: "N/A",
            MBaccName: "N/A",
            MBaccNum: "N/A",
            owner: req.session.user
          };
        }
        else {
          var post = {
            img: folder,
            header: req.body.header,
            caption: req.body.caption,
            tags: tagsArray,
            BDOaccName: req.body.nameBDO,
            BDOaccNum: req.body.numBDO,
            BPIaccName: req.body.nameBPI,
            BPIaccNum: req.body.numBPI,
            MBaccName: "N/A",
            MBaccNum: "N/A",
            owner: req.session.user
          };
        }
      }
    }
  
    postModel.createPost(post, function(err, postResult) {
      if(err){
        console.log(err);
        req.flash('error_msg', 'Could not create post. Please try again.');
        res.redirect('/post/create');
      }
      else {
        req.flash('success_msg', 'New post generated!');
        res.redirect('/profile');
        console.log(postResult);
      }
    }) 
	}
  else {
    const messages = errors.array().map((item) => item.msg);
    req.flash('error_msg', messages.join(' '));
    res.redirect('/post/create');
	}
};

// Get post by ID
exports.getID = (req, res) => {
  var id = req.params.id;

  postModel.getByID(id, (err, result) => {
    if (err) {
      throw err;
    } else {
      var postObject = result.toObject();
      res(postObject);
    }
  });
};

// Edit post 
exports.edit = (req, res) => {
  const { image1 , header, caption, funds , tags, BdoName, 
    BdoNum, BpiName, BpiNum, MbName, MbNum } = req.body;

  var n = null;
  var folder= "";

  if(req.file != n){
     folder = "img/"+req.file.originalname;
  }else{
     folder = req.body.image1;
  }

  if (req.body.tags != ""){
    var tagsArray = getTags(req.body.tags);
  }

  var update = {
    $set: { 
      img: folder,
      header: req.body.header,
      caption: req.body.caption,
      tags: tagsArray,
      BDOaccName: req.body.BdoName,
      BDOaccNum: req.body.BdoNum,
      BPIaccName: req.body.BpiName,
      BPIaccNum: req.body.BpiNum,
      MBaccName: req.body.MbName,
      MBaccNum: req.body.MbNum,
      owner: req.session.user
    } 
  };
 
  postModel.update(req.body._id, update, (err, result) => {
    if (err) {
      req.flash('error_msg', 'Could not edit post. Please try again.');
      res.redirect('/profile');
    } else {
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

      const toArr = [...result];
      return toArr;
  } else {
      return false;
  }
}