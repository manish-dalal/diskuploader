"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const login = _joi.default.object().keys({
  email: _joi.default.string().email().required(),
  password: _joi.default.string().required()
});

exports.login = login;