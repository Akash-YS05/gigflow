const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  gigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gig',
    required: true
  },
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    maxlength: [1000, 'Message cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [1, 'Price must be at least 1']
  },
  status: {
    type: String,
    enum: ['pending', 'hired', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

//compound index to prevent duplicate bids
bidSchema.index({ gigId: 1, freelancerId: 1 }, { unique: true });

module.exports = mongoose.model('Bid', bidSchema);
