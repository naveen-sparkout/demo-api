"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _glob = _interopRequireDefault(require("glob"));

var _path = _interopRequireDefault(require("path"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _async = _interopRequireDefault(require("async"));

var _mongooseAutoIncrement = _interopRequireDefault(require("mongoose-auto-increment"));

var _winston = _interopRequireDefault(require("./winston"));

// import npm packages
var env = process.env.NODE_ENV || "development";
global.config = {};

module.exports = function (callback) {
  _async["default"].series([function (envCb) {
    // configuring the environment
    (0, _glob["default"])("config/env/**/*.json", function (err, files) {
      if (err) {
        return envCb(err);
      } else {
        // picking up the environment file
        global.config = require(_path["default"].join(__dirname, "env", env + ".json")); // _.extend(config, JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8')));

        if (!config) {
          return envCb("error occured while loading config file!");
        } else {
          _winston["default"].info("loaded config file:" + env);

          var dbURI = config.mongodb.host + config.mongodb.db_name;

          _winston["default"].info("Try to Connect MongoDb: " + dbURI); // make connection with mongodb


          if (!_mongoose["default"].connection.readyState) {
            _mongoose["default"].connect(dbURI, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              // useCreateIndex: true,
              retryWrites: false // useFindAndModify: false

            });
          } else return envCb(); // when successfully connected


          _mongoose["default"].connection.on("connected", function () {
            _winston["default"].info("mongoose connection open to " + dbURI); // Enabling mongoose debug mode if required


            _mongoose["default"].set("debug", config.mongodb.enableMongoDebugging);

            return envCb();
          });

          _mongooseAutoIncrement["default"].initialize(_mongoose["default"].connection); // if the connection throws an error


          _mongoose["default"].connection.on("error", function (err) {
            //   if you get error for the first time when this gets started make sure to run mongod
            return envCb(err);
          }); // when the connection is disconnected


          _mongoose["default"].connection.on("disconnected", function () {
            return envCb("mongoose connection disconnected");
          });
        }
      }
    });
  }, function (modelsCb) {
    // load all models
    var routePath = _path["default"].join(__dirname, "..", "app/modules/**/*.model.js");

    (0, _glob["default"])(routePath, function (err, files) {
      if (err) {
        return modelsCb(err);
      } else {
        _winston["default"].info("models are loading ...");

        files.forEach(function (file) {
          require("".concat(file));

          _winston["default"].info("".concat(file), "is loaded");
        });
        return modelsCb();
      }
    });
  }, function (eventscb) {
    // load all models
    var routePath = _path["default"].join(__dirname, "..", "app/modules/library/**/*.js");

    (0, _glob["default"])(routePath, function (err, files) {
      if (err) {
        return eventscb(err);
      } else {
        _winston["default"].info("models are loading ...");

        files.forEach(function (file) {
          require("".concat(file));

          _winston["default"].info("".concat(file), "is loaded");
        });
        return eventscb();
      }
    });
  }], function (err) {
    if (err) {
      return callback(err);
    } else {
      return callback();
    }
  });
};
//# sourceMappingURL=config.js.map