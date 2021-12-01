const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  motivationText: { type: String, require: false },
  // name: { type: String, require: true },
  // date: { type: Date, require: false },
  // isEdited: { type: Boolean, require: false },
  // isOpened: { type: Boolean, require: false },
  // labels: { type: Array, require: false },
  // imagePath: { type: String, require: false },
});

userSchema.plugin(uniquevalidator);

module.exports = mongoose.model('User', userSchema);