// rank schema only has a string rank field

const mongoose = require('mongoose');

const rankSchema = new mongoose.Schema({
    rank: { type: String, required: true },
});


const Rank = mongoose.model('Rank', rankSchema);

module.exports = Rank;
