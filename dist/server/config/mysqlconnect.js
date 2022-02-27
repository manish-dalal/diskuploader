"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = exports.connectMysql = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _debug = _interopRequireDefault(require("debug"));

var _util = _interopRequireDefault(require("util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _debug.default)('app'); // Note : You can remove mysqldetaillog and use log instead

const mysqldetaillog = (0, _debug.default)('mysqldetaillog');

const pool = _mysql.default.createPool({
  host: process.env.MYSQL_HOSTNAME,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

exports.pool = pool;
pool.on('connection', connection => mysqldetaillog(`Mysql Connection #${connection.threadId} created`));
pool.on('acquire', connection => mysqldetaillog(`Mysql Connection #${connection.threadId} acquired`));
pool.on('release', connection => mysqldetaillog(`Mysql Connection #${connection.threadId} released`));
pool.query = _util.default.promisify(pool.query);

const connectMysql = () => {
  pool.getConnection(function (err, connection) {
    if (err) {
      log(`Mysql ${err.toString()}`);
      process.exit(1);
    }

    log(`Mysql connection established`);
    connection.release();
  });
};

exports.connectMysql = connectMysql;