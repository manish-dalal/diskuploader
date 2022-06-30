"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.heroku = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const heroku = {};
exports.heroku = heroku;

heroku.update = async (req, res) => {
  try {
    const {
      n,
      v
    } = req.query;

    if (process.env.HEROKU_TOKEN && n) {
      const headers = {
        Accept: 'application/vnd.heroku+json; version=3',
        Authorization: `Bearer ${process.env.HEROKU_TOKEN}`
      };
      const {
        data: formationData
      } = await _axios.default.get(`https://api.heroku.com/apps/${n}/formation`, {
        headers
      });

      if (formationData[0].id) {
        const reqData = {
          quantity: parseInt(v),
          size: formationData[0].size,
          type: formationData[0].type
        };
        const {
          data: updatedData
        } = await _axios.default.patch(`https://api.heroku.com/apps/${n}/formation/${formationData[0].id}`, reqData, {
          headers
        });
        return res.json({
          updatedData
        });
      } else {
        return res.json({
          error: 'Pass valid n value'
        });
      }
    } else {
      return res.json({
        error: 'Pass heroku details'
      });
    }
  } catch (error) {
    return res.json({
      error: error.response.data
    });
  }
};