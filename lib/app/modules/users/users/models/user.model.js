"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

/**
 * User Schema
 */
var userSchema = _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = _mongoose["default"].model('User', userSchema);
//# sourceMappingURL=user.model.js.map