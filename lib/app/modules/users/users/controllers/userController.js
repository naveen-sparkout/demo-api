"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUser = exports.createUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _winston = _interopRequireDefault(require("../../../../../config/winston"));

var responseModule = require('../../../../../config/response');

/**
 * Function to create a User
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = new _user["default"](req.body);
            _context.prev = 1;
            _context.next = 4;
            return user.save(function (error, result) {
              if (error) {
                if (error.name == 'ValidationError') {
                  return res.status(400).json({
                    success: 0,
                    message: error.message,
                    response: 400,
                    data: {}
                  });
                }

                return responseModule.errorResponse(res, {
                  success: 0,
                  message: "User creation failed",
                  data: {
                    error: error
                  }
                });
              } else {
                return responseModule.successResponse(res, {
                  success: 1,
                  message: 'User created successfully',
                  data: result
                });
              }
            });

          case 4:
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](1);

            _winston["default"].error(_context.t0);

            return _context.abrupt("return", next());

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 6]]);
  }));

  return function createUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Function to login a User
 * 
 * @param {Object} req 
 * @param {Object} res 
 */


exports.createUser = createUser;

var loginUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = new _user["default"](req.body.email);
            _context2.prev = 1;
            _context2.next = 4;
            return _user["default"].find({
              $and: [{
                email: req.body.email
              }, {
                password: req.body.password
              }]
            }).exec(function (error, result) {
              if (error) {
                if (error.name == 'ValidationError') {
                  return res.status(400).json({
                    success: 0,
                    message: error.message,
                    response: 400,
                    data: {}
                  });
                }

                return responseModule.errorResponse(res, {
                  success: 0,
                  message: "User LOGIN failed",
                  data: {
                    error: error
                  }
                });
              } else {
                return responseModule.successResponse(res, {
                  success: 1,
                  message: 'User LOGIN successfully',
                  data: result
                });
              }
            });

          case 4:
            _context2.next = 10;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](1);

            _winston["default"].error(_context2.t0);

            return _context2.abrupt("return", next());

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 6]]);
  }));

  return function loginUser(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.loginUser = loginUser;
//# sourceMappingURL=userController.js.map