const mongoose = require('./connection');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	username: { type:String, required: true, min:5, max:15  },
  password: { type:String, required: true, min:5, max:18 },
});

const User = mongoose.model('users', userSchema);

// Users
var userArray = [
  {
    email: 'Jacob_salazar@dlsu.edu.ph',
    username: 'Jacob_salazar',
    password: 'dlsu1234'
  },
  {
    email: 'jazzmine_ilagan@yahoo.com',
    username: 'jazzmine07',
    password: 'animeislife'
  },
  {
    email: 'Enrico_Cuison@gmail.com',
    username: 'Enrico_cuison',
    password:  'dlsu1234'
  },
  {
    email: 'admin@dlsu.edu.ph',
    username: 'admin',
    password: 'admin'
  }
]

for(i = 0; i < userArray.length; i++){
  console.log("Reading userArray:");
  console.log(userArray[i].password);
  const saltRounds = 10;

  const user = new User({
    email: userArray[i].email,
    username: userArray[i].username,
    password: userArray[i].password
  });

  // Hash password
	bcrypt.hash(userArray[i].password, saltRounds, (err, hashed) => {
		user.password = hashed;
        
    user.save(function (err, result) {
      if (err) throw err;
      console.log(result);
    });  
  });
}

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

console.log("List of all users");
console.log(User);