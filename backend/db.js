const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',      // 修改为你的 MySQL 用户名
  password: 'lyx599599',  // 修改为你的 MySQL 密码
  database: 'hotel_management',
  port: 3307
});

module.exports = pool.promise();