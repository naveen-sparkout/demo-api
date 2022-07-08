"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _winston = _interopRequireDefault(require("winston"));

var _excluded = ["timestamp", "level", "label", "message", "stack"];
var options = _winston["default"].LoggerOptions = {
  format: _winston["default"].format.combine(_winston["default"].format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }), _winston["default"].format.errors({
    stack: true
  }), _winston["default"].format.colorize(), _winston["default"].format.splat(), _winston["default"].format.printf(function (_ref) {
    var timestamp = _ref.timestamp,
        level = _ref.level,
        label = _ref.label,
        message = _ref.message,
        stack = _ref.stack,
        rest = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
    var namespace = label ? "(".concat(label, ")") : '';
    var errStack = stack ? "\n".concat(stack) : ''; // const meta = rest && Object.keys(rest).length ? `\n${JSON.stringify(rest, undefined, 2)}` : '';

    return "[".concat(timestamp, "] ").concat(level, ": ").concat(namespace, " ").concat(message, " ").concat(errStack);
  })),
  transports: [// new winston.transports.Console({ level: process.env.NODE_ENV === 'production' ? 'error' : 'debug' }),
  new _winston["default"].transports.Console({
    level: process.env.NODE_ENV === 'production' ? 'debug' : 'debug'
  }), new _winston["default"].transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }), new _winston["default"].transports.File({
    filename: 'logs/debug.log',
    level: 'debug'
  })]
};

var logger = _winston["default"].createLogger(options);

var _default = logger;
exports["default"] = _default;
//# sourceMappingURL=winston.js.map