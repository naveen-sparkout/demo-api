"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = void 0;

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _fs = _interopRequireDefault(require("fs"));

var _jimp = _interopRequireDefault(require("jimp"));

var _winston = _interopRequireDefault(require("./winston"));

var _path = _interopRequireDefault(require("path"));

_awsSdk["default"].config.update({
  secretAccessKey: config.aws.s3.secretAccessKey,
  accessKeyId: config.aws.s3.accessKeyId,
  region: config.aws.s3.region
});

var BUCKET = config.aws.s3.bucket;
var s3 = new _awsSdk["default"].S3();
var upload = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: BUCKET,
    key: function key(req, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    }
  })
});
exports.upload = upload;
//# sourceMappingURL=multer.js.map