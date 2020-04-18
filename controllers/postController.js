
const userModel = require('../models/user');
const postModel = require('../models/post');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.getAllPosts = (param, callback) =>{
    postModel.getAll(param, (err, posts) => {
        if (err) throw err;
    
        const postObjects = [];
    
        posts.forEach(function(doc) {
          postObjects.push(doc.toObject());
        });
    
        callback(postObjects);
      });
};