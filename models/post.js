const mongoose = require('mongoose');
const databaseURL = 'mongodb://localhost:27017/charitydb';

/** README **
  We need to set useFindAndModify to false because mongoose's findOneAndUpdate
  is using a deprecated function: findAndModify.
  This will suppress the warning.
**/
const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options);

const postSchema = new mongoose.Schema({
	
	img: { type:String,required:true },
  header: { type:String, required: true, min:1, max:15  },
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	caption: { type:String, required: true, min:1, max:250 },
  tag: {type:String, required: false, min: 1, max:100},

});

module.exports = mongoose.model('Post', postSchema);
