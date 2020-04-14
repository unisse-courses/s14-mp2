const userModel = require('../models/user');
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

exports.searchPost = (req, res) => {
  const errors = validationResult(req);
	if (errors.isEmpty()) {
    const { searchTitle } = req.body;
    console.log("You searched for: " + searchTitle);
		postModel.getAllPosts({ searchTitle: searchTitle }, (err, result) => {
			if (result) {
        console.log(result);
        console.log("After searching for title...");
			} else {
        req.flash('error_msg', 'No such post found. Try again.');
			}
    });
	} else {
		const messages = errors.array().map((item) => item.msg);
		req.flash('error_msg', messages.join(' '));
	}
};

/*
router.post('/searchPost', function(req, res) {

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