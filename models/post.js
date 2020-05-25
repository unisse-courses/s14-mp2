const mongoose = require('./connection');
const userModel = require('../models/user');

const postSchema = new mongoose.Schema({
	img: { type: String,required:true },
  header: { type: String, required: true, min:1, max:15  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
	caption: { type: String, required: true, min:1, max:250 },
  tags: {type: String, required: false, min: 1, max:100},
});

const Post = mongoose.model('posts', postSchema);

// Creating post
exports.createPost = function(obj, next) {
  const post = new Post(obj);
  console.log(post);
  post.save(function(err, post) {
    next(err, post);
  });
};

// Getting all post
exports.getAll = (param, next) => {
  Post.find({} , (err, posts) => {
    next(err, posts);
  });
};

// Search post via header (I based this  doon sa ginawa ni msis plus yung previous working natin dati, yung before siya gawing MVC)
exports.getTitle = function(query, next) {
  Post.find(query, function(err, posts) {
    next(err, posts);
  });
};

// TODO: Find all post with a username 



/*
exports.getTitle = function(query, next) {
  Post.find({ header: { $regex: query, $options:'i' }}, function(err, posts) {
    next(err, posts);
  });
};
*/