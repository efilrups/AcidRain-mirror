const mysql = require("mysql");
const password = process.env.RAIN_PASSWORD;

const host = "localhost";
let connection = mysql.createConnection({
  host,
  user: "root",
  password,
  database: "acidrain"
});

connection.connect();

module.exports = connection;
