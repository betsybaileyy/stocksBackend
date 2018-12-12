const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const investmentSchema = new Schema({
  createdAt: {
    type: Date
  },
  invDate: {
    type: Date,
    required: true
  },
  invAmount: {
    type: Number,
    required: true
  },
  stocks: {
    type: Number,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  investor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Investment', investmentSchema);
