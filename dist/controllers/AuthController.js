"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = require("bcryptjs");

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var AuthController = /*#__PURE__*/function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, [{
    key: "test",
    value: function test(request, response) {
      response.send("Hello user, this is a testing route");
    } // create new user

  }, {
    key: "create",
    value: function create(request, response) {
      // Validate request body Input | name | email | password |
      var schema = _joi["default"].object({
        name: _joi["default"].string().required().min(3).max(50),
        email: _joi["default"].string().required().email(),
        password: _joi["default"].string().required().min(8)
      });

      var _schema$validate = schema.validate(request.body),
          error = _schema$validate.error;

      if (error) return response.status(422).send(error.details[0].message); // Check if email Exits

      response.send("register");
    }
  }, {
    key: "login",
    value: function login(request, response) {
      // Login Validation request body | email | password
      var schema = _joi["default"].object({
        email: _joi["default"].string().required().email(),
        password: _joi["default"].string().required().min(8)
      });

      var _schema$validate2 = schema.validate(request.body),
          error = _schema$validate2.error;

      if (error) return response.status(422).send(error.details[0].message);
      response.send('Login');
    }
  }, {
    key: "sendPasswordResetEmail",
    value: function sendPasswordResetEmail(request, response) {
      var schema = _joi["default"].object({
        email: _joi["default"].string().required().email()
      });

      var _schema$validate3 = schema.validate(request.body),
          error = _schema$validate3.error;

      if (error) return response.status(422).send(error.details[0].message); // Check if email Exits

      response.send('send email');
    } // async passwordReset(request, response) {
    //     const schema = Joi.object({
    //         password: Joi.string().required().min(8),
    //     })
    //     const { error } = schema.validate(request.body)
    //     if (error) return response.status(422).send(error.details[0].message)
    //     // Generate a Hashed Password
    //     const salt = await genSalt(10)
    //     const hashedPassword = await hash(request.body.password, salt)
    //     const data = [ hashedPassword, request.user.id ]
    //     response.send({ data })
    // }

  }]);

  return AuthController;
}();

var _default = new AuthController();

exports["default"] = _default;