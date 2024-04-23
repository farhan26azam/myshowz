const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    novelid: { type: mongoose.Schema.Types.ObjectId, ref: 'Novel', required: true },
    readerid: { type: mongoose.Schema.Types.ObjectId, ref: 'Reader', required: true },
    like: { type: Boolean, required: true },
    });

module.exports = mongoose.model("Like", likeSchema);
