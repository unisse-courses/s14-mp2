const mongoose = require('mongoose');
const databaseURL = 'mongodb://localhost:27017/charitydb';

const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options);

const userSchema = new mongoose.Schema({
	email: { type:String, required:true },
	username: { type:String, required: true, min:1, max:15  },
  password: { type:String, required: true, min:1, max:250 },
});

module.exports = mongoose.model('User', userSchema);