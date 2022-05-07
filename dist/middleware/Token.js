"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Token = /*#__PURE__*/function () {
  function Token() {
    _classCallCheck(this, Token);
  }

  _createClass(Token, [{
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