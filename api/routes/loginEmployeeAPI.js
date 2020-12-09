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

router.get('/', function(request, response) {
  let email = request.query.email;
  let pass = request.query.pass;
  conn.query("SELECT * FROM employee WHERE email = '" + email + "' AND passcode = '" + pass + "';", function(error, results) {
    if (error) {
      response.status(400).send('Error in database operation');
    } else {
      response.send(results);
    }
  });
});



module.exports = router;