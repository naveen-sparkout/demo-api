"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _glob = _interopRequireDefault(require("glob"));

var _winston = _interopRequireDefault(require("./winston"));

var _path = _interopRequireDefault(require("path"));

var routes = function routes(app) {
  _winston["default"].info('routes are loading ...');

  var routePath = _path["default"].join(__dirname, '..', 'app/modules/**/*.routes.js');

  var version = '/api/v1';

  _glob["default"].sync(routePath).forEach(function (file) {
    var _require = require("".concat(file)),
        routes = _require.routes;

    routes(app, version);

    _winston["default"].info("".concat(file, " is loaded"));
  });
};

exports.routes = routes;
//# sourceMappingURL=routes.js.map