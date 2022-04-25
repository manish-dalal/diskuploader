"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tasks = void 0;

var _task = require("./task.model");

var _httpStatus = require("../../utils/httpStatus");

const tasks = {};
exports.tasks = tasks;

tasks.index = async (req, res) => {
  const {
    botToken
  } = req.query;
  let tasks = await _task.taskModel.find({
    botToken
  });
  return res.json({
    tasks
  });
};

tasks.create = async (req, res) => {
  let data = await _task.taskModel.create(req.body);
  return res.status(_httpStatus.httpStatus.CREATED).json({
    data
  });
};

tasks.update = async (req, res) => {
  let task = await _task.taskModel.findById(req.params.id);
  if (!task) return res.status(_httpStatus.httpStatus.BAD_REQUEST).json({
    message: 'Task not found'
  });
  Object.assign(task, req.body);
  await task.save();
  return res.json({
    message: 'Record updated'
  });
};