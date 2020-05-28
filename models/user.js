const mongoose = require('./connection');

const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	username: { type: String, required: true, min:5, max:15  },
  password: { type: String, required: true, min:5, max:18 },
  bio: { type: String, required: false, min:5, max:150, default: "This is your profile page, you can edit this by clicking the edit button."},
  dp: { type: String, required: false, default: "../img/user.png" },
});

const User = mongoose.model('users', userSchema);

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

// Edit bio/dp
exports.update = function(id, update, next) {
  User.findOneAndUpdate({_id: id}, update, { new: true }, function(err, post) {
    next(err, post);
  })
};