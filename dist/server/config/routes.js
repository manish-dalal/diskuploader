"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _axios = _interopRequireDefault(require("axios"));

var _user = require("../modules/users/user.routes");

var _auth = require("../modules/auth/auth.routes");

var _message = require("../modules/messages/message.routes");

var _heroku = require("../modules/heroku/heroku.routes");

var _task = require("../modules/tasks/task.routes");

var _httpStatus = require("../utils/httpStatus");

var _fileupload = require("../utils/fileupload");

var _common = require("../modules/common/common.routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Router = _express.default.Router();

exports.Router = Router;
Router.all('/health-check', (req, res) => {
  console.log('API /health-check');
  return res.json({
    message: 'OK'
  });
});
Router.all('/keepalive', async (req, res) => {
  var origin = req.connection.remoteAddress;
  console.log('API /keepalive', origin, req.ip);

  try {
    const res1 = req.query.url && (await _axios.default.get(req.query.url));
    console.log('keepalive res', res1.data);
  } catch (error) {
    console.log('keepalive error', JSON.stringify(error));
  }

  return res.json({
    message: 'OK'
  });
});
Router.use('/users', _user.userRoutes);
Router.use('/auth', _auth.authRoutes);
Router.use('/msc', _common.commonRoutes);
Router.use('/message', _message.messageRoutes);
Router.use('/task', _task.taskRoutes);
Router.use('/h', _heroku.herokuRoutes);
Router.post('/fileupload', (0, _multer.default)({
  storage: _fileupload.diskStorage,
  limits: _fileupload.limits,
  fileFilter: _fileupload.imageFileFilter
}).single('avatar'), (req, res) => {
  if (!req.file) return res.status(_httpStatus.httpStatus.UNPROCESSABLE_ENTITY).json({
    error: 'Please select file'
  });
  return res.json({
    data: req.file
  });
});
Router.post('/s3fileupload', (0, _multer.default)({
  storage: _fileupload.s3Storage,
  limits: _fileupload.limits,
  fileFilter: _fileupload.imageFileFilter
}).single('avatar'), (req, res) => {
  if (!req.file) return res.status(_httpStatus.httpStatus.UNPROCESSABLE_ENTITY).json({
    error: 'Please select file'
  });
  return res.json({
    data: req.file
  });
});