"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageModel = exports.getModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema
} = _mongoose.default;
const messageSchema = new Schema({
  _partition: {
    type: String
  },
  imgDriveId: {
    type: String
  },
  cloudinaryUrl: {
    type: String
  },
  text: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const messageModel = _mongoose.default.model('v1_dood_messages', messageSchema);

exports.messageModel = messageModel;
let models = {};

const getModel = collectionName => {
  if (!(collectionName in models)) {
    models[collectionName] = _mongoose.default.model(collectionName, messageSchema);
  }

  return models[collectionName];
};

exports.getModel = getModel;