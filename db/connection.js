var mysql = require('mysql');
let connectionString = process.env.JAWSDB_URL || "mysql://root:@localhost:3306/beanie_prices";
const databaseConnection = mysql.createConnection(connectionString);
databaseConnection.connect();

module.exports = databaseConnection;
