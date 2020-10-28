const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const schemaCleaner = require('../utils/schemaCleaner');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: () => {
      return `https://secure.gravatar.com/avatar/${this._id}?s=90&d=identicon`;
    },
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.plugin(uniqueValidator);
schemaCleaner(userSchema);

module.exports = mongoose.model('User', userSchema);
