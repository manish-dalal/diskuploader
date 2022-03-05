"use strict";

var _nodeCron = _interopRequireDefault(require("node-cron"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nodeCron.default.schedule('*/4 * * * *', () => {
  // runs every 4 minute
  console.log('started at: ' + new Date().toLocaleString());
});