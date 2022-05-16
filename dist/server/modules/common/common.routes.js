"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _asyncWrapper = require("../../utils/asyncWrapper");

var _common = require("./common.controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const commonRoutes = _express.default.Router();

exports.commonRoutes = commonRoutes;
commonRoutes.post('/post', (0, _asyncWrapper.asyncWrapper)(_common.common.post));
commonRoutes.get('/get', (0, _asyncWrapper.asyncWrapper)(_common.common.get));
commonRoutes.get('/cloudinary', (0, _asyncWrapper.asyncWrapper)(_common.common.cloudinary));