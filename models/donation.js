const mongoose = require('./connection');

const donateSchema = new mongoose.Schema({
  postID: { type: mongoose.Schema.Types.ObjectId, ref:'posts', required: true},
  donor:{ type: String, required: false},
  donationAmount: { type: Number, required: true},
});

const Donation = mongoose.model('donate', donateSchema);

