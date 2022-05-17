"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _joi = _interopRequireDefault(require("joi"));

var _TodoModel = _interopRequireDefault(require("../models/TodoModel"));

var TodoController = /*#__PURE__*/function () {
  function TodoController() {
    (0, _classCallCheck2["default"])(this, TodoController);
  }

  (0, _createClass2["default"])(TodoController, [{
    key: "index",
    value: // get all todos that belongs to user
    function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response) {
        var todos;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _TodoModel["default"].find({
                  user_id: request.user._id
                });

              case 3:
                todos = _context.sent;
                response.send(todos);
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                response.status(400).send(_context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function index(_x, _x2) {
        return _index.apply(this, arguments);
      }

      return index;
    }() // create a new todo

  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response) {
        var schema, _schema$validate, error, todo;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                schema = _joi["default"].object({
                  todo: _joi["default"].string().required().min(5),
                  list: _joi["default"].array(),
                  todo_date: _joi["default"].date().required(),
                  due_date: _joi["default"].date()
                });
                _schema$validate = schema.validate(request.body), error = _schema$validate.error;

                if (!error) {
                  _context2.next = 5;
                  break;
                }

                throw error.details[0].message;

              case 5:
                _context2.next = 7;
                return _TodoModel["default"].create({
                  user_id: request.user._id,
                  todo: request.body.todo,
                  list: request.body.list,
                  todo_date: request.body.todo_date,
                  due_date: request.body.due_date ? request.body.due_date : null
                });

              case 7:
                todo = _context2.sent;
                response.send(todo);
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                response.status(400).send(_context2.t0);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11]]);
      }));

      function create(_x3, _x4) {
        return _create.apply(this, arguments);
      }

      return create;
    }() // update current todo

  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(request, response) {
        var schema, _schema$validate2, error, todo;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                schema = _joi["default"].object({
                  todo: _joi["default"].string().required().min(5),
                  list: _joi["default"].array(),
                  todo_date: _joi["default"].date().required(),
                  due_date: _joi["default"].date()
                });
                _schema$validate2 = schema.validate(request.body), error = _schema$validate2.error;

                if (!error) {
                  _context3.next = 5;
                  break;
                }

                throw error.details[0].message;

              case 5:
                _context3.next = 7;
                return _TodoModel["default"].findById(request.params.id);

              case 7:
                todo = _context3.sent;
                todo.todo = request.body.todo;
                todo.list = request.body.list;
                todo.todo_date = request.body.todo_date;
                todo.due_date = request.body.due_date;
                todo.done = false;
                _context3.next = 15;
                return todo.save();

              case 15:
                response.send(todo);
                _context3.next = 21;
                break;

              case 18:
                _context3.prev = 18;
                _context3.t0 = _context3["catch"](0);
                response.status(400).send(_context3.t0);

              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 18]]);
      }));

      function update(_x5, _x6) {
        return _update.apply(this, arguments);
      }

      return update;
    }() // update and mark todo as done = true

  }, {
    key: "done",
    value: function () {
      var _done = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(request, response) {
        var todo;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _TodoModel["default"].findById(request.params.id);

              case 3:
                todo = _context4.sent;
                todo.done = true;
                _context4.next = 7;
                return todo.save();

              case 7:
                response.send(todo);
                _context4.next = 13;
                break;

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](0);
                response.status(400).send(_context4.t0);

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 10]]);
      }));

      function done(_x7, _x8) {
        return _done.apply(this, arguments);
      }

      return done;
    }() // add new todo item to list of todos

  }, {
    key: "addListItem",
    value: function () {
      var _addListItem = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(request, response) {
        var schema, _schema$validate3, error, todo;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                schema = _joi["default"].object({
                  list: _joi["default"].array()
                });
                _schema$validate3 = schema.validate(request.body), error = _schema$validate3.error;

                if (!error) {
                  _context5.next = 5;
                  break;
                }

                throw error.details[0].message;

              case 5:
                _context5.next = 7;
                return _TodoModel["default"].findById(request.params.id);

              case 7:
                todo = _context5.sent;
                _context5.next = 10;
                return request.body.list.forEach(function (item) {
                  return todo.list.push(item);
                });

              case 10:
                _context5.next = 12;
                return todo.save();

              case 12:
                response.send(todo);
                _context5.next = 18;
                break;

              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5["catch"](0);
                response.status(400).send(_context5.t0);

              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 15]]);
      }));

      function addListItem(_x9, _x10) {
        return _addListItem.apply(this, arguments);
      }

      return addListItem;
    }() // remove todo item from list

  }, {
    key: "removeListItem",
    value: function () {
      var _removeListItem = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(request, response) {
        var schema, _schema$validate4, error, todo;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                schema = _joi["default"].object({
                  list: _joi["default"].array()
                });
                _schema$validate4 = schema.validate(request.body), error = _schema$validate4.error;

                if (!error) {
                  _context6.next = 5;
                  break;
                }

                throw error.details[0].message;

              case 5:
                _context6.next = 7;
                return _TodoModel["default"].findById(request.params.id);

              case 7:
                todo = _context6.sent;
                _context6.next = 10;
                return request.body.list.forEach(function (item) {
                  return todo.list.pull(item);
                });

              case 10:
                _context6.next = 12;
                return todo.save();

              case 12:
                response.send(todo);
                _context6.next = 18;
                break;

              case 15:
                _context6.prev = 15;
                _context6.t0 = _context6["catch"](0);
                response.status(400).send(_context6.t0);

              case 18:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 15]]);
      }));

      function removeListItem(_x11, _x12) {
        return _removeListItem.apply(this, arguments);
      }

      return removeListItem;
    }() // remove || delete the entire todo

  }, {
    key: "destroy",
    value: function () {
      var _destroy = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(request, response) {
        var todo;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return _TodoModel["default"].findById(request.params.id);

              case 3:
                todo = _context7.sent;
                _context7.next = 6;
                return todo["delete"]();

              case 6:
                response.send({
                  message: 'Todo item has been deleted successful'
                });
                _context7.next = 12;
                break;

              case 9:
                _context7.prev = 9;
                _context7.t0 = _context7["catch"](0);
                response.status(400).send(_context7.t0);

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 9]]);
      }));

      function destroy(_x13, _x14) {
        return _destroy.apply(this, arguments);
      }

      return destroy;
    }()
  }]);
  return TodoController;
}();

var _default = new TodoController();

exports["default"] = _default;