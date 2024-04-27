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
  phone: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  bio: {
    type: String,
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
  rank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rank'
  },
});

const Writer = mongoose.model('Writer', writerSchema);

module.exports = Writer;


