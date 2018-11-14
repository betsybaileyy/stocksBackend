const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const investmentSchema = new Schema({
  createdAt: {
    type: Date
  },
  invDate: {
    type: Date
  },
  invAmount: {
    type: Number
  },
  stocks: {
    type: Number
  },
  investor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Investment', investmentSchema);
