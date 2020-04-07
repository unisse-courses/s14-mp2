const mongoose = require('./connection');

const postSchema = new mongoose.Schema({
	img: { type:String,required:true },
  header: { type:String, required: true, min:1, max:15  },
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	caption: { type:String, required: true, min:1, max:250 },
  tag: {type:String, required: false, min: 1, max:100},
});

module.exports = mongoose.model('Post', postSchema);