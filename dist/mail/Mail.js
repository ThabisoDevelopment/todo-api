"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function Mail(_x) {
  return _Mail.apply(this, arguments);
}

function _Mail() {
  _Mail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
    var transporter;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // create reusable transporter object using the default SMTP transport
            transporter = _nodemailer["default"].createTransport({
              host: process.env.SMTP_HOST,
              port: process.env.SMTP_PORT,
              secure: false,
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
              }
            }); // send mail with defined transport object

            _context.next = 3;
            return transporter.sendMail({
              from: "\"P.O.S systems\" <".concat(process.env.SMTP_USER, ">"),
              // sender address
              to: user.email,
              // list of receivers
              subject: user.subject,
              // Subject line
              text: user.text,
              // plain text body
              html: "<b>Hello world?</b>" // html body

            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _Mail.apply(this, arguments);
}

var _default = Mail;
exports["default"] = _default;