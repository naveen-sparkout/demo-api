"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _morgan = _interopRequireDefault(require("morgan"));

var _chalk = _interopRequireDefault(require("chalk"));

// Setup Console Logging
_morgan["default"].token('remote-user', function (_ref, res) {
  var user = _ref.user;

  if (user) {
    if (user.userType === 'user') {
      return "{userId: ".concat(user._id, " &name: ").concat(user.name, "}");
    } else if (user.userType === 'driver') {
      return "{driverId: ".concat(user._id, " &name: ").concat(user.name, "}");
    } else if (user.userType === 'Admin' || user.userType === 'SubAdmin') {
      return "{adminId: ".concat(user._id, " &name: ").concat(user.name, "}");
    }
  } else {
    return 'Guest';
  }
}); // app.use(logger(':date[iso] :clientIP :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));


var morganChalk = (0, _morgan["default"])(function (tokens, req, res) {
  return [_chalk["default"].green.bold(tokens.date(req, res, 'iso')), _chalk["default"].blue.bold(tokens['remote-addr'](req, res)), _chalk["default"].yellow.bold(tokens['remote-user'](req, res)), _chalk["default"].green.bold(tokens.method(req, res)), _chalk["default"].blue.bold(tokens.url(req, res)), _chalk["default"].red.bold(tokens.status(req, res)), _chalk["default"].blue.bold(tokens.res(req, res, 'content-length')), _chalk["default"].yellow.bold("".concat(tokens['response-time'](req, res), " ms"))].join(' ');
});
var _default = {
  morganChalk: morganChalk
};
exports["default"] = _default;
//# sourceMappingURL=morgan.js.map