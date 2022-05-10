"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

require("dotenv/config");

var _express = _interopRequireWildcard(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./router/routes"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**  Initializing or Starting Express Server */
var app = (0, _express["default"])();
/**
 *  Make DB connection to Mongo DB
 */

var db = _mongoose["default"].connect(process.env.DB_CONNECTION);

db.then(function () {
  return console.log("DB connection success!");
});
/**
 * CORS middleware
 * Enable body-parser 
 */

var corsOptions = {
  origin: '*',
  methods: "GET, POST, PUT, PATCH, DELETE",
  optionsSuccessStatus: 200
};
app.use((0, _cors["default"])(corsOptions));
app.use((0, _express.json)());
/**
 * Import Routes
 * add routes to app
 */

app.use('/api', _routes["default"]);
/** Server Listening */

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server Running on port: ".concat(PORT));
});