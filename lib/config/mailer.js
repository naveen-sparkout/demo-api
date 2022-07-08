"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transporter = exports.sendEmail = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _winston = _interopRequireDefault(require("./winston"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _fs = _interopRequireDefault(require("fs"));

var _emailTemplates = _interopRequireDefault(require("email-templates"));

var _path = _interopRequireDefault(require("path"));

var _nodemailerSendgrid = _interopRequireDefault(require("nodemailer-sendgrid"));

var transporter = _nodemailer["default"].createTransport((0, _nodemailerSendgrid["default"])({
  apiKey: config.mailer.SENDGRID_API_KEY
}));

exports.transporter = transporter;

var sendEmail = function sendEmail(receiverEmail, subject, templateData, template, directory, cb) {
  var rootPath = _path["default"].normalize("".concat(__dirname, "/.."));

  _winston["default"].info(' Receiver Email => %s', receiverEmail);

  var templateDir = _path["default"].join(rootPath, 'app', 'modules', directory, 'templates', 'email', template);

  _fs["default"].lstat(templateDir, function (err, stats) {
    if (err || !stats.isDirectory()) {
      _winston["default"].error(err);

      return cb(err);
    }

    var email = new _emailTemplates["default"]({
      message: {
        from: "".concat(config.mailer.mailerName, " < ").concat(config.mailer.fromAddress, " >")
      },
      send: global.config.env === 'development' ? true : true,
      views: {
        options: {
          extension: 'ejs'
        }
      },
      preview: false,
      transport: transporter
    });
    var receivers = '';
    if (templateData.name) receivers = "".concat(templateData.name, " <").concat(receiverEmail, ">");else receivers = "<".concat(receiverEmail, ">");
    email.send({
      template: templateDir,
      message: {
        to: receivers
      },
      locals: templateData
    }).then(function (_ref) {
      var _ref2 = (0, _slicedToArray2["default"])(_ref, 1),
          response = _ref2[0];

      _winston["default"].info('Email has been delivered with code %s %s to %s', response.statusCode, response.statusMessage, receivers);

      return cb();
    })["catch"](_winston["default"].error);
  });
};

exports.sendEmail = sendEmail;
//# sourceMappingURL=mailer.js.map