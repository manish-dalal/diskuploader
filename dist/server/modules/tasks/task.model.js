"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.taskModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema
} = _mongoose.default;
const taskSchema = new Schema({
  botToken: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  page: {
    type: String,
    required: true
  },
  pageIncrementor: {
    type: String,
    required: true
  },
  channelName: {
    type: String,
    required: true
  },
  linkType: {
    type: String,
    required: true
  },
  cname: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  lastExecuted: {
    type: Date
  },
  thumbUrl: {
    type: String
  },
  groupInfo: {
    type: Schema.Types.Mixed,
    required: true
  },
  isEuOrgLink: {
    type: Boolean,
    default: true
  },
  isNewMdisk: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const taskModel = _mongoose.default.model('tasks', taskSchema);

exports.taskModel = taskModel;