"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorObject = exports["default"] = void 0;

var _glob = _interopRequireDefault(require("glob"));

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = _interopRequireDefault(require("fs"));

var _winston = _interopRequireDefault(require("./winston"));

var _path = _interopRequireDefault(require("path"));

_winston["default"].info('error messages are loading ...');

var routePath = _path["default"].join(__dirname, '..', 'app/modules/**/*.errors.json'); // let routePath = 'app/modules/**/*.errors.json';
// initialising with common error message objects


var errorObject = {
  1: {
    'msg': {
      'EN': 'User does not exist.'
    }
  },
  2: {
    'msg': {
      'EN': 'Incorrect password.'
    }
  },
  3: {
    'msg': {
      'EN': 'User is not authenticated.'
    }
  },
  4: {
    'msg': {
      'EN': 'User is not authorized to visit the api.'
    }
  },
  5: {
    'msg': {
      'EN': 'Only JPEG, JPG, PNG format images allowed.'
    }
  },
  10: {
    'msg': {
      'EN': 'Street Address is required.'
    }
  },
  11: {
    'msg': {
      'EN': 'Postal Code is required.'
    }
  },
  12: {
    'msg': {
      'EN': 'City is required.'
    }
  },
  13: {
    'msg': {
      'EN': 'State is required.'
    }
  },
  14: {
    'msg': {
      'EN': 'Country is required.'
    }
  }
};
exports.errorObject = errorObject;

_glob["default"].sync(routePath).forEach(function (file) {
  _lodash["default"].extend(errorObject, JSON.parse(_fs["default"].readFileSync(file, 'utf-8')));

  _winston["default"].info("".concat(file, " is loaded"));
});

var _default = errorObject;
exports["default"] = _default;
//# sourceMappingURL=errors.js.map