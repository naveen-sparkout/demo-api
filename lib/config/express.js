"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _http = _interopRequireDefault(require("http"));

var _morgan = _interopRequireDefault(require("./morgan"));

var _winston = _interopRequireDefault(require("./winston"));

var expressPort = _interopRequireWildcard(require("./expressPort"));

var _routes = require("./routes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var app = (0, _express["default"])();
// Setup Request Info Logging in Console with Morgan
app.use(_morgan["default"].morganChalk); // parse application/json

app.use(_express["default"].json({
  limit: '4mb'
})); // parse application/x-www-form-urlencoded

app.use(_express["default"].urlencoded({
  extended: true
}));

require('./config')(function (err) {
  if (err) {
    _winston["default"].error(err);
  } else {
    // Create HTTP server.
    global.server = _http["default"].createServer(app);
    /**
     * Get port from environment and store in Express.
     */

    global.port = expressPort.normalizePort(config.PORT || '3000');
    global.server.listen(global.port, '0.0.0.0');
    global.server.on('error', expressPort.onError);
    global.server.on('listening', expressPort.onListening); // CORS middleware

    var corsOptionsDelegate = function corsOptionsDelegate(req, callback) {
      var corsOptions;
      var allowedOrigins = ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:8080'];

      if (allowedOrigins.includes(req.header('Origin'))) {
        corsOptions = {
          credentials: true,
          origin: true
        };
      } else {
        corsOptions = {
          origin: false
        };
      }

      callback(null, corsOptions);
    };

    app.use((0, _cors["default"])(corsOptionsDelegate));
    app.use((0, _helmet["default"])());
    app.use((0, _cookieParser["default"])());
    global.errors = require('./errors');
    (0, _routes.routes)(app);
    app.get('/', function (req, res, next) {
      res.json({
        status: 1,
        message: 'server is up and running.',
        data: {}
      });
    }); // catch 404 and forward to error handler

    app.use(function (req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    }); // error handlers

    var errorHandler = require('./errorHandler');

    app.use(errorHandler.allErrorHandler);
  }
});

var _default = app;
exports["default"] = _default;
//# sourceMappingURL=express.js.map