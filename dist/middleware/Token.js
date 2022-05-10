"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var Token = /*#__PURE__*/function () {
  function Token() {
    (0, _classCallCheck2["default"])(this, Token);
  }

  (0, _createClass2["default"])(Token, [{
    key: "verify",
    value: // verify token if user is authenticated
    function verify(request, response, next) {
      var token = request.header('authorization') || null;
      if (!token) return response.status(401).send("Access Denied");

      try {
        var verified = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
        /** JWT_PASSWORD_RESET */


        request.user = verified;
        next();
      } catch (error) {
        return response.status(403).send(error.message);
      }
    } // verify password reset token

  }, {
    key: "verifyPasswordReset",
    value: function verifyPasswordReset(request, response, next) {
      var token = request.header('authorization') || null;
      if (!token) return response.status(401).send("Access Denied");

      try {
        var verified = _jsonwebtoken["default"].verify(token, process.env.JWT_PASSWORD_RESET);
        /** JWT_PASSWORD_RESET */


        request.user = verified;
        next();
      } catch (error) {
        return response.status(403).send(error.message);
      }
    }
  }]);
  return Token;
}();

var _default = new Token();

exports["default"] = _default;