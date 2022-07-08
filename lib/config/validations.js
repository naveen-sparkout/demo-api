"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorFormatterV2 = exports.customValidators = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

var _validUrl = _interopRequireDefault(require("valid-url"));

var errorFormatterV2 = function errorFormatterV2(error) {
  return {
    param: error.param,
    message: error.msg,
    value: error.value,
    location: error.location,
    nestedErrors: error.nestedErrors
  };
};

exports.errorFormatterV2 = errorFormatterV2;
var customValidators = {
  isNumber: function isNumber(value) {
    return _lodash["default"].isNumber(value);
  },
  isArray: function isArray(value) {
    return Array.isArray(value);
  },
  isNumArray: function isNumArray(array) {
    var isNum = true;
    array.forEach(function (value) {
      if (!_lodash["default"].isNumber(value)) isNum = false;
    });
    return isNum;
  },
  isValidPercentage: function isValidPercentage(value) {
    return value >= 0 && value <= 100;
  },
  arrayElemNotDuplicated: function arrayElemNotDuplicated(array) {
    if (array && array.length > 1) {
      var values = _lodash["default"].filter(array, function (value, index, iteratee) {
        return _lodash["default"].includes(iteratee, value, index + 1);
      });

      if (values.length) return false;else return true;
    } else {
      return true;
    }
  },
  arrayIsNotEmpty: function arrayIsNotEmpty(array) {
    if (array && array.length) {
      return true;
    } else {
      return false;
    }
  },
  isUserIdValid: function isUserIdValid(value) {
    return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(value) || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
  },
  isDeviceTypeValid: function isDeviceTypeValid(value) {
    return value == global.config.deviceTypes[0] || value == global.config.deviceTypes[1];
  },
  isUserTypeValid: function isUserTypeValid(value) {
    return value == global.config.userTypes[0] || value == global.config.userTypes[1];
  },
  isPhoneNumberValid: function isPhoneNumberValid(value) {
    var regex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
    var IndoRegex = /^(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+$/;
    return /^((\+92)|(0092)|(92))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/.test(value) || regex.test(value) || IndoRegex.test(value);
  },
  isLatLongValid: function isLatLongValid(value) {
    return /^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/.test(value);
  },
  nonNegative: function nonNegative(value) {
    return value >= 0;
  },
  isValidDateAndTime: function isValidDateAndTime(value) {
    return (0, _moment["default"])(value).isValid();
  },
  isValidDate: function isValidDate(value) {
    return (0, _moment["default"])(value, 'DD-MM-YYYY').isValid();
  },
  isValidEmailOrPhone: function isValidEmailOrPhone(value) {
    if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value)) {
      return true;
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      return true;
    } else {
      return false;
    }
  },
  isValidCurrentOrFutureDate: function isValidCurrentOrFutureDate(value) {
    var date = (0, _moment["default"])(value);
    var currentDate = (0, _moment["default"])().unix();
    return (0, _moment["default"])(date).isAfter(currentDate);
  },
  isValidEmail: function isValidEmail(value) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
  },
  isValidObjectId: function isValidObjectId(value) {
    var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

    if (checkForHexRegExp.test(value)) {
      return true;
    } else {
      return false;
    }
  },
  isValidDeviceType: function isValidDeviceType(value) {
    if (value === 'android' || value === 'ios' || value === 'web') {
      return true;
    } else {
      return false;
    }
  },
  isValidWhoWillValue: function isValidWhoWillValue(value) {
    value = parseInt(value);

    if (value === 1 || value === 2 || value === 3) {
      return true;
    } else {
      return false;
    }
  },
  isMessageContainsContent: function isMessageContainsContent(_ref) {
    var length = _ref.length;

    if (length > 0) {
      return true;
    } else {
      return false;
    }
  },
  isValidUrl: function isValidUrl(value) {
    if (value) {
      if (_validUrl["default"].isUri(value)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  },
  validateAge: function validateAge(value) {
    if (value) {
      var dob = (0, _moment["default"])(value, 'DD-MM-YYYY');
      var years = (0, _moment["default"])().diff(dob, 'years');

      if (years >= 18) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  },
  isValidName: function isValidName(name) {
    var regex = /^[a-zA-Z ]{2,30}$/;

    if (regex.test(name)) {
      return true;
    } else {
      return false;
    }
  },
  isValidDistanceArea: function isValidDistanceArea(value) {
    if (value) {
      if (value > -1 && value < 501) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  isValidImageIndex: function isValidImageIndex(value) {
    if (value && value > -1 && value <= 5) {
      return true;
    } else {
      return false;
    }
  },
  isValidSlotMinutes: function isValidSlotMinutes(minutes) {
    if (minutes === 0 || minutes === 15 || minutes === 30 || minutes === 45) {
      return true;
    } else {
      return false;
    }
  },
  isValidCurrentOrFutureUnixTimeStamp: function isValidCurrentOrFutureUnixTimeStamp(value) {
    var date = _moment["default"].unix(value);

    var currentDate = (0, _moment["default"])();
    return (0, _moment["default"])(date).isAfter(currentDate);
  },
  isValidAddressType: function isValidAddressType(type) {
    if (type === 'Home' || type === 'Work' || type === 'Other') {
      return true;
    } else {
      return false;
    }
  },
  isArrayNotEmpty: function isArrayNotEmpty(_ref2) {
    var length = _ref2.length;

    if (length) {
      return true;
    }

    return false;
  },
  isValidUnixTimeStamp: function isValidUnixTimeStamp(value) {
    return _moment["default"].unix(value).isValid();
  },
  isBoolean: function isBoolean(value) {
    return _lodash["default"].isBoolean(value);
  },
  isValidPassword: function isValidPassword(_ref3) {
    var length = _ref3.length;

    if (length < 8) {
      return false;
    }

    return true;
  },
  isValidHour: function isValidHour(value) {
    if (value.length < 0 || value > 23) {
      return false;
    }

    return true;
  },
  isValidMinute: function isValidMinute(value) {
    if (value.length < 0 || value > 59) {
      return false;
    }

    return true;
  },
  isValidMonth: function isValidMonth(value) {
    if (value < 0 || value > 11) {
      return false;
    }

    return true;
  },
  isValidYear: function isValidYear(value) {
    if (value < 1900 || value > (0, _moment["default"])().year()) {
      return false;
    }

    return true;
  },
  "enum": function _enum(value, options) {
    if (options.includes(value)) {
      return true;
    }

    return false;
  },
  validateRadius: function validateRadius(value) {
    var reg = /^\d+$/;

    if (reg.test(value)) {
      if (value <= 0) {
        return false;
      }

      return true;
    } else {
      return false;
    }
  }
};
exports.customValidators = customValidators;
//# sourceMappingURL=validations.js.map