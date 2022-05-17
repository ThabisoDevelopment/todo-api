"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _AuthController = _interopRequireDefault(require("../controllers/AuthController"));

var _TodoController = _interopRequireDefault(require("../controllers/TodoController"));

var _Token = _interopRequireDefault(require("../middleware/Token"));

// Import controllers
// initiate express router
var router = (0, _express.Router)(); // auth routes

router.post('/oauth/login', _AuthController["default"].login);
router.post('/oauth/register', _AuthController["default"].create);
router.post('/oauth/forgot', _AuthController["default"].sendPasswordResetEmail);
router.put('/oauth/reset', _Token["default"].verifyPasswordReset, _AuthController["default"].passwordReset);
router.post('/oauth/verify', _Token["default"].verify, function (request, response) {
  return response.sendStatus(200);
}); //  todo routes

router.get("/todos", _Token["default"].verify, _TodoController["default"].index);
router.post("/todos", _Token["default"].verify, _TodoController["default"].create);
router.put("/todos/:id", _Token["default"].verify, _TodoController["default"].update);
router.put("/todos/done/:id", _Token["default"].verify, _TodoController["default"].done);
router.put("/todos/list/:id", _Token["default"].verify, _TodoController["default"].addListItem);
router["delete"]("/todos/list/:id", _Token["default"].verify, _TodoController["default"].removeListItem);
router["delete"]("/todos/:id", _Token["default"].verify, _TodoController["default"].destroy);
var _default = router;
exports["default"] = _default;