"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _message = require("./message.controller");

var _asyncWrapper = require("../../utils/asyncWrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const messageRoutes = _express.default.Router();

exports.messageRoutes = messageRoutes;
messageRoutes.get('/list', (0, _asyncWrapper.asyncWrapper)(_message.messages.index));
messageRoutes.get('/update-cloudinary', (0, _asyncWrapper.asyncWrapper)(_message.messages.updateCloudinary));