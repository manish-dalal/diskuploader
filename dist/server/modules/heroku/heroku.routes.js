"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.herokuRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _asyncWrapper = require("../../utils/asyncWrapper");

var _heroku = require("./heroku.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const herokuRoutes = _express.default.Router();

exports.herokuRoutes = herokuRoutes;
herokuRoutes.get('/', (0, _asyncWrapper.asyncWrapper)(_heroku.heroku.update));