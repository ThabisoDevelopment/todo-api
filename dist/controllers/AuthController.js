"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _bcryptjs = require("bcryptjs");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _joi = _interopRequireDefault(require("joi"));

var _jsonwebtoken = require("jsonwebtoken");

var _Mail = _interopRequireDefault(require("../mail/Mail"));

var _UserModel = _interopRequireDefault(require("../models/UserModel"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var AuthController = /*#__PURE__*/function () {
  function AuthController() {
    (0, _classCallCheck2["default"])(this, AuthController);
  }

  (0, _createClass2["default"])(AuthController, [{
    key: "create",
    value: // create new user
    function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response) {
        var schema, _schema$validate, error, exists, salt, hashed_password, user, data, mail_template;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                // Validate request body Input | name | email | password |
                schema = _joi["default"].object({
                  name: _joi["default"].string().required().min(3).max(50),
                  email: _joi["default"].string().required().email(),
                  password: _joi["default"].string().required().min(8)
                });
                _schema$validate = schema.validate(request.body), error = _schema$validate.error;

                if (!error) {
                  _context.next = 5;
                  break;
                }

                throw error.details[0].message;

              case 5:
                _context.next = 7;
                return _UserModel["default"].exists({
                  email: request.body.email
                });

              case 7:
                exists = _context.sent;

                if (!exists) {
                  _context.next = 10;
                  break;
                }

                throw 'Sorry! email already exist try login instead';

              case 10:
                _context.next = 12;
                return (0, _bcryptjs.genSalt)(10);

              case 12:
                salt = _context.sent;
                _context.next = 15;
                return (0, _bcryptjs.hash)(request.body.password, salt);

              case 15:
                hashed_password = _context.sent;
                _context.next = 18;
                return _UserModel["default"].create({
                  name: request.body.name,
                  email: request.body.email,
                  password: hashed_password
                });

              case 18:
                user = _context.sent;
                data = {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  email_verified: user.email_verified,
                  createdAt: (0, _dayjs["default"])(user.createdAt).format('DD MMM YYYY'),
                  updatedAt: (0, _dayjs["default"])(user.createdAt).format('DD MMM YYYY')
                };
                mail_template = {
                  email: request.body.email,
                  subject: 'Welcome To anestordev TO-DO app',
                  text: "Welcome to anestordev to-do app where you can make your todo list of things"
                };
                _context.next = 23;
                return (0, _Mail["default"])(mail_template);

              case 23:
                response.status(201).send(_objectSpread({
                  message: "Your account has been created successful"
                }, data));
                _context.next = 29;
                break;

              case 26:
                _context.prev = 26;
                _context.t0 = _context["catch"](0);
                response.status(400).send(_context.t0);

              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 26]]);
      }));

      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }() // authenticate user

  }, {
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response) {
        var schema, _schema$validate2, error, exists, user, valid_pass, token, data;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                // Login Validation request body | email | password
                schema = _joi["default"].object({
                  email: _joi["default"].string().required().email(),
                  password: _joi["default"].string().required().min(8)
                });
                _schema$validate2 = schema.validate(request.body), error = _schema$validate2.error;

                if (!error) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", response.status(422).send(error.details[0].message));

              case 5:
                _context2.next = 7;
                return _UserModel["default"].exists({
                  email: request.body.email
                });

              case 7:
                exists = _context2.sent;

                if (exists) {
                  _context2.next = 10;
                  break;
                }

                throw 'Sorry! this user does not exist try signup instead';

              case 10:
                _context2.next = 12;
                return _UserModel["default"].findOne({
                  email: request.body.email
                });

              case 12:
                user = _context2.sent;
                _context2.next = 15;
                return (0, _bcryptjs.compare)(request.body.password, user.password);

              case 15:
                valid_pass = _context2.sent;

                if (valid_pass) {
                  _context2.next = 18;
                  break;
                }

                throw 'Sorry! your password is incorrent';

              case 18:
                // Create and Assign Token
                token = (0, _jsonwebtoken.sign)({
                  _id: user._id
                }, process.env.JWT_SECRET, {
                  expiresIn: '1d'
                });
                data = {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  email_verified: user.email_verified,
                  createdAt: (0, _dayjs["default"])(user.createdAt).format('DD MMM YYYY'),
                  updatedAt: (0, _dayjs["default"])(user.createdAt).format('DD MMM YYYY')
                };
                response.send(_objectSpread({
                  token: token
                }, data));
                _context2.next = 26;
                break;

              case 23:
                _context2.prev = 23;
                _context2.t0 = _context2["catch"](0);
                response.status(400).send(_context2.t0);

              case 26:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 23]]);
      }));

      function login(_x3, _x4) {
        return _login.apply(this, arguments);
      }

      return login;
    }() // send email with password reset link to user

  }, {
    key: "sendPasswordResetEmail",
    value: function () {
      var _sendPasswordResetEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(request, response) {
        var schema, _schema$validate3, error, exists, user, token, mail_template;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                schema = _joi["default"].object({
                  email: _joi["default"].string().required().email()
                });
                _schema$validate3 = schema.validate(request.body), error = _schema$validate3.error;

                if (!error) {
                  _context3.next = 5;
                  break;
                }

                throw error.details[0].message;

              case 5:
                _context3.next = 7;
                return _UserModel["default"].exists({
                  email: request.body.email
                });

              case 7:
                exists = _context3.sent;

                if (exists) {
                  _context3.next = 10;
                  break;
                }

                throw 'Sorry! this user does not exist try signup instead';

              case 10:
                _context3.next = 12;
                return _UserModel["default"].findOne({
                  email: request.body.email
                });

              case 12:
                user = _context3.sent;
                token = (0, _jsonwebtoken.sign)({
                  _id: user._id
                }, process.env.JWT_PASSWORD_RESET, {
                  expiresIn: '1d'
                });
                mail_template = {
                  email: request.body.email,
                  subject: 'Reset Your Password',
                  text: "Click the link to reset passwod: http://localhost:8000/oauth/reset?token=".concat(token)
                };
                _context3.next = 17;
                return (0, _Mail["default"])(mail_template);

              case 17:
                response.send({
                  message: "Password reset link has been sent to your email - check your inbox",
                  mail_template: mail_template
                });
                _context3.next = 23;
                break;

              case 20:
                _context3.prev = 20;
                _context3.t0 = _context3["catch"](0);
                response.status(400).send(_context3.t0);

              case 23:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 20]]);
      }));

      function sendPasswordResetEmail(_x5, _x6) {
        return _sendPasswordResetEmail.apply(this, arguments);
      }

      return sendPasswordResetEmail;
    }() // update user forgot password

  }, {
    key: "passwordReset",
    value: function () {
      var _passwordReset = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(request, response) {
        var schema, _schema$validate4, error, salt, hashed_password, user;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                schema = _joi["default"].object({
                  password: _joi["default"].string().required().min(8)
                });
                _schema$validate4 = schema.validate(request.body), error = _schema$validate4.error;

                if (!error) {
                  _context4.next = 5;
                  break;
                }

                throw error.details[0].message;

              case 5:
                _context4.next = 7;
                return (0, _bcryptjs.genSalt)(10);

              case 7:
                salt = _context4.sent;
                _context4.next = 10;
                return (0, _bcryptjs.hash)(request.body.password, salt);

              case 10:
                hashed_password = _context4.sent;
                _context4.next = 13;
                return _UserModel["default"].findById(request.user._id);

              case 13:
                user = _context4.sent;
                user.password = hashed_password;
                _context4.next = 17;
                return user.save();

              case 17:
                response.send({
                  message: 'Your password has been updated success'
                });
                _context4.next = 23;
                break;

              case 20:
                _context4.prev = 20;
                _context4.t0 = _context4["catch"](0);
                response.status(400).send(_context4.t0);

              case 23:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 20]]);
      }));

      function passwordReset(_x7, _x8) {
        return _passwordReset.apply(this, arguments);
      }

      return passwordReset;
    }()
  }]);
  return AuthController;
}();

var _default = new AuthController();

exports["default"] = _default;