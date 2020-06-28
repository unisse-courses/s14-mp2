const mongoose = require('./connection');

const postSchema = new mongoose.Schema({
	img: { type: String, required: true },
  header: { type: String, required: true, min:5, max:15 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
	caption: { type: String, required: true, min:5, max:250 },
  tags: [{  type: String, required: false }],
  BDOaccName: { type: String, required: false, default: "N/A" },
  BDOaccNum: { type: String, required: false, default: "N/A" },
  BPIaccName: { type: String, required: false, default: "N/A" },
  BPIaccNum: { type: String, required: false, default: "N/A" },
  MBaccName: { type: String, required: false, default: "N/A" },
  MBaccNum: { type: String, required: false, default: "N/A" }
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

// Getting featured post
exports.getFeatured = (param, next) => {
  Post.find({} , (err, posts) => {
    next(err, posts);
  }).limit(6);
};

// Getting all post
exports.getAll = (param, next) => {
  Post.find({}, (err, posts) => {
    next(err, posts);
  });
};

// Search post via header & tags
exports.getTitle = function(header, tags, next) {
  Post.find({ $or: [ header, tags ]}, function(err, posts) {
    next(err, posts);
    console.log(err);
  });
};

// Getting posts owned by users 
exports.savedPosts = function(query, next) {
  Post.find(query, function(err, posts) {
    next(err, posts);
  });
};

// Get post by ID
exports.getByID = function(query, next) {
  Post.findById(query, function(err, post) {
    next(err, post);
  });
};

// Edit post
exports.update = function(id, update, next) {
  Post.findOneAndUpdate({_id: id}, update, { new: true }, function(err, post) {
    next(err, post);
  })
};

// Delete post
exports.remove = function(query, next) {
  Post.findByIdAndRemove(query, function(err, post){
    next(err, post);
  });
};