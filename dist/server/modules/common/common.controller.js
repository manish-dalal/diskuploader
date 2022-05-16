"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.common = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _cloudinary = require("cloudinary");

require("../../config/cloudinary");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const common = {};
exports.common = common;

common.post = async (req, res) => {
  try {
    const {
      url,
      body
    } = req.body;
    const {
      data = {}
    } = await _axios.default.post(url, body);
    return res.json({
      data
    });
  } catch (error) {
    return res.json({
      error: error.response.data
    });
  }
};

common.get = async (req, res) => {
  try {
    const {
      data = {}
    } = await _axios.default.get(req.query.url);
    return res.json({
      data
    });
  } catch (error) {
    // if (error.response) {
    //   // Request made and server responded
    //   reject(response);
    // } else if (error.request) {
    //   // The request was made but no response was received
    //   reject(response);
    // } else {
    //   // Something happened in setting up the request that triggered an Error
    //   reject(response);
    // }
    return res.json({
      error: error.response.data
    });
  }
};

common.cloudinary = async (req, res) => {
  try {
    const apiSecret = _cloudinary.v2.config().api_secret;

    const cloudName = _cloudinary.v2.config().cloud_name;

    const apiKey = _cloudinary.v2.config().api_key;

    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = _cloudinary.v2.utils.api_sign_request({
      timestamp: timestamp,
      folder: 'm'
    }, apiSecret);

    return res.json({
      timestamp,
      signature,
      cloudname: cloudName,
      apikey: apiKey
    });
  } catch (error) {
    return res.json({
      error: error.response.data
    });
  }
};