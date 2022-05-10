"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv/config");

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function Mail(_x) {
  return _Mail.apply(this, arguments);
}

function _Mail() {
  _Mail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
    var transporter;
    return _regenerator["default"].wrap(function _callee$(_context) {
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