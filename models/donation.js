const mongoose = require('./connection');

const donateSchema = new mongoose.Schema({
  donor:{ type: String, required: false},
  cardNumber: { type: Number, required: false },
  cvv: { type: Number, required: false },
  postID: { type: Number, required: true},
  expDate: { type: Date, required: false },
  donationAmount: { type:Number, required: true},
  donationID: { type: Number, required: true,},
  accountID: { type: Number, required: false},
});

const Donation = mongoose.model('donate', donateSchema);