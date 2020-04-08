const mongoose = require('./connection');
const userModel = require('../models/user');


console.log("posts model")

const postSchema = new mongoose.Schema({
	img: { type:String,required:true },
  header: { type:String, required: true, min:1, max:15  },
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	caption: { type:String, required: true, min:1, max:250 },
  tag: {type:String, required: false, min: 1, max:100},
});


const Post = mongoose.model('posts', postSchema);



exports.createPost = function(obj, next) {
  const post = new Post(obj);
  console.log(post);
  post.save(function(err, post) {
    next(err, post);
  });
};


exports.getAll = (param,next) =>{
  Post.find({} , (err,posts) => {
    next(err,posts);
    console.log(posts);
  });
};



