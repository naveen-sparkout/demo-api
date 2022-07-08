"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onListening = exports.onError = exports.normalizePort = void 0;

var _winston = _interopRequireDefault(require("./winston"));

var _chalk = _interopRequireDefault(require("chalk"));

// Normalize a port into a number, string, or false.
var normalizePort = function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};
/**
 * Event listener for HTTP server "error" event.
 */


exports.normalizePort = normalizePort;

var onError = function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof global.port === 'string' ? "Pipe ".concat(global.port) : "Port ".concat(global.port); // handle specific listen errors with friendly messages

  switch (error.code) {
    case 'EACCES':
      console.error("".concat(bind, " requires elevated privileges"));
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error("".concat(bind, " is already in use"));
      process.exit(1);
      break;

    default:
      throw error;
  }
};
/**
 * Event listener for HTTP server "listening" event.
 */


exports.onError = onError;

var onListening = function onListening() {
  var addr = global.server.address();
  var bind = typeof addr === 'string' ? "pipe ".concat(addr) : "port ".concat(addr.port);

  _winston["default"].info(_chalk["default"].bold.green('Server is listening on', bind));
};

exports.onListening = onListening;
//# sourceMappingURL=expressPort.js.map