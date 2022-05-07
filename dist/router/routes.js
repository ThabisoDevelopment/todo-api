"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _AuthController = _interopRequireDefault(require("../controllers/AuthController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Import controllers
// initiate express router
var router = (0, _express.Router)(); // auth routes

router.get('/oauth/test', _AuthController["default"].test);
router.post('/oauth/login', _AuthController["default"].login); // router.post('/oauth/register', AuthController.create)
// router.post('/oauth/forgot', AuthController.sendPasswordResetEmail)
// router.put('/oauth/reset', Token.verifyPasswordReset, AuthController.passwordReset)
// router.post('/oauth/verify', Token.verify, (request, response) => response.sendStatus(200))
//  Check out routes

var _default = router;
exports["default"] = _default;