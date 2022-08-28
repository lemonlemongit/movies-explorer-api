const mongoose = require('mongoose');
const validator = require('validator');

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    requare: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Необходим Еmail',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    requare: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', usersSchema);
