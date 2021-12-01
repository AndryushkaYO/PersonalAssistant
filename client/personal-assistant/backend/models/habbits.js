const mongoose = require('mongoose');

const habbitsSchema = mongoose.Schema({
  name: { type: String, require: true },
  visible: { type: Boolean, require: true },
  markedDates: [ String ],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }
});

module.exports = mongoose.model('Habbit', habbitsSchema);
