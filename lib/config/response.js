"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.successResponse = exports.errorResponseWithData = exports.errorResponse = void 0;

var _errors = _interopRequireDefault(require("./errors"));

var _winston = _interopRequireDefault(require("./winston"));

var successResponse = function successResponse(res, data) {
  var statusCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  data.response = 200;

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'quality' || process.env.NODE_ENV === 'staging') {// winston.info(JSON.stringify(data.data));
  }

  res.status(statusCode).json(data);
};

exports.successResponse = successResponse;

var errorResponse = function errorResponse(res, err) {
  if (err.name == 'ValidationError') {
    res.status(400).json({
      success: 0,
      message: err.errors,
      response: 400,
      data: {}
    });
  } else {
    res.json({
      success: 0,
      data: {},
      message: err,
      response: err.Code
    });
  }
};

exports.errorResponse = errorResponse;

var errorResponseWithData = function errorResponseWithData(req, res, _ref, data) {
  var msgCode = _ref.msgCode;
  res.json({
    success: 0,
    message: _errors["default"][msgCode].msg.EN,
    response: 400,
    data: data
  });
};

exports.errorResponseWithData = errorResponseWithData;
//# sourceMappingURL=response.js.map