// ReaderSchema.js
const mongoose = require('mongoose');

const readerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Add reader-specific fields here
});

const Reader = mongoose.model('Reader', readerSchema);

module.exports = Reader;
