const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: false }
});

module.exports = mongoose.model('Post', postSchema);