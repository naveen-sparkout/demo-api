"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;

/**
* Module dependencies.
*/
function render(_ref, res) {
  var user = _ref.user;
  res.render('index', {
    user: user ? JSON.stringify(user) : 'null'
  });
}
//# sourceMappingURL=index.js.map