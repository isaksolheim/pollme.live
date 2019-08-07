const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pollSchema = new Schema({
  question: String,
  options: [{ content: String, votes: Number }],
}, {
  timestamps: true,
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;