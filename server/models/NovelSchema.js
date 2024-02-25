const mongoose = require("mongoose");

const novelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  wrtierid: { type: Number, required: true },
  versionno: { type: Number, required: true },
  versioncount: { type: Number, required: true },
  versionorder: { type: Number, required: true },
});

module.exports = mongoose.model("Novel", novelSchema);
