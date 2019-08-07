const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pollSchema = new Schema({
  question: String,
  options: [{ content: String, votes: Number }],
  date: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;