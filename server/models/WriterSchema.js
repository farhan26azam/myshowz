const mongoose = require('mongoose');

const writerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0
  },
  skills: {
    type: [String],
    default: []
  },
});

const Writer = mongoose.model('Writer', writerSchema);

module.exports = Writer;


