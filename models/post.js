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

const userSchema = new mongoose.Schema({
	
	email: { type:String,required:true },
	username: { type:String, required: true, min:1, max:15  },
    password: { type:String, required: true, min:1, max:250 },
    
});
/** README **
  Export the model as the main content of this module.
**/
module.exports = mongoose.model('User', userSchema);
