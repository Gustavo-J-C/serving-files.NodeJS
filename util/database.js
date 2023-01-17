const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'servingfiles',
    password: ''
});

module.exports = pool.promise();