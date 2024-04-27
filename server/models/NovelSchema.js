const mongoose = require("mongoose");

const novelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  writerid: { type: mongoose.Schema.Types.ObjectId, ref: 'Writer'},
  versionno: { type: Number, required: true },
  versioncount: { type: Number, required: true },
  versionorder: { type: Number, required: true },
  genres: { type: [mongoose.Schema.Types.ObjectId], ref: 'Genre', required: true },
  content: { type: String, required: true },
  description: { type: String, required: true },
  likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'Like' },
  active: { type: Boolean, required: true },
  next: { type: mongoose.Schema.Types.ObjectId, ref: 'Novel' },
});




module.exports = mongoose.model("Novel", novelSchema);
