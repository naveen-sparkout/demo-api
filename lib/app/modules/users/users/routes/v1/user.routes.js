"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _userController = require("../../controllers/userController");

//User Routes
var routes = function routes(app, version) {
  app.post(version + '/create-user', _userController.createUser);
  app.get(version + '/login', _userController.loginUser);
};

exports.routes = routes;
//# sourceMappingURL=user.routes.js.map