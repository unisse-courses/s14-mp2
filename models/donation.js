const mongoose = require('./connection');

const donateSchema = new mongoose.Schema({
  postID: { type: Number, required: true},
  donationID: { type: Number, required: true,},
  donationAmount: { type:Number, required: true},
  accountID: { type: Number, required: false},
  donor:{ type: String, required: false},
});

const Donation = mongoose.model('donate', donateSchema);