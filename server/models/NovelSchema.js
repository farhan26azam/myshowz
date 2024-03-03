const mongoose = require("mongoose");

const novelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  writerid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Writer', required: true }],
  versionno: { type: Number, required: true },
  versioncount: { type: Number, required: true },
  versionorder: { type: Number, required: true },
});


module.exports = mongoose.model("Novel", novelSchema);
