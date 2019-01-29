/**
 * MySql 数据库连接池
 */
const mysql = require('mysql');
var pool = mysql.createConnection({
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : '',
    database : 'xiaofeiniu', //默认连接数据库
    connectionLimit : 10
});
module.exports = pool;
