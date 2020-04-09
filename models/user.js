const mongoose = require('./connection');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	username: { type: String, required: true, min:5, max:15  },
  password: { type: String, required: true, min:5, max:18 },
});

const User = mongoose.model('users', userSchema);

// TODO
//exports.updateUser = function(user,next) {

//}

// Getting all users
exports.getAll = function(next){
  User.find({},function(err, result) {
    const users = [];
    
    result.forEach(function(user){
      users.push(user.toObject());
    });
    
    next(err, users);
  });
};

// Saving a user given the validated object
exports.create = function(obj, next) {
  const user = new User(obj);
  console.log(user);
  user.save(function(err, user) {
    next(err, user);
  });
};

// Retrieving a user based on ID
exports.getById = function(id, next) {
  User.findById(id, function(err, user) {
    next(err, user);
  });
};

// Retrieving just ONE user based on a query (first one)
exports.getOne = function(query, next) {
  User.findOne(query, function(err, user) {
    next(err, user);
  });
};