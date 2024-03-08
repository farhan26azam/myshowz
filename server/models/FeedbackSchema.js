const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    feedback: { type: Number, required: true },
    novelid: { type: mongoose.Schema.Types.Object, required: true, ref: "Novel" },
    readerid: { type: mongoose.Schema.Types.Object, required: true, ref: "Reader" },
    writerid: { type: mongoose.Schema.Types.Object, required: true, ref: "Writer" },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);