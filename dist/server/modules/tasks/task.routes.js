"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.taskRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _task = require("./task.controller");

var _asyncWrapper = require("../../utils/asyncWrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const taskRoutes = _express.default.Router();

exports.taskRoutes = taskRoutes;
taskRoutes.get('/list', (0, _asyncWrapper.asyncWrapper)(_task.tasks.index));
taskRoutes.post('/', (0, _asyncWrapper.asyncWrapper)(_task.tasks.create));
taskRoutes.put('/:id', (0, _asyncWrapper.asyncWrapper)(_task.tasks.update));