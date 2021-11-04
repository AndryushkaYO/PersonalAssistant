const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: false },
  mood: { type: String, require: true },
  date: { type: Date, require: false },
  isEdited: { type: Boolean, require: false },
  isOpened: { type: Boolean, require: false },
  labels: { type: Array, require: false },
  imagePath: { type: String, require: false },
});

module.exports = mongoose.model('Post', postSchema);