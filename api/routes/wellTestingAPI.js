var express = require("express");
var router = express.Router();
var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "covid-test"
});

conn.connect();

router.get('/ret', function(request, response) {
  conn.query("SELECT * FROM welltesting", function(error, results) {
    if (error) {
      response.status(400).send('Error in database operation');
    } else {
      response.send(results);
    }
  });
});

module.exports = router;