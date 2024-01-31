const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  filename: { type: String, required: true },
  fileId: { type: Schema.Types.ObjectId, required: true }, // Reference to GridFS file
  filepath: { type: String, required: true }, // Optional: If you're storing files externally or need a path
  filetype: { type: String, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", fileSchema);
