const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'bc74561f08d0a8',
  password: '396a3ec4',
  database: 'heroku_dc2628510efc1f3',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('base de datos connected');
  }
});

module.exports = mysqlConnection;
