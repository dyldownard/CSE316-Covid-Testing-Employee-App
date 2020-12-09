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

router.get('/testret', function(request, response) {
  let id = request.query.id;
  conn.query("SELECT * FROM employeetest WHERE (`employeeID` = \'" + id + "\')", function(error, results) {
    if (error) {
      response.status(400).send('Error in database operation');
    } else {
      response.send(results);
    }
  });
});

router.get('/poolret', function(request, response) {
  let testcode = request.query.testcode;
  conn.query("SELECT * FROM poolmap WHERE (`testBarcode` = \'" + testcode + "\')", function(error, results) {
    if (error) {
      response.status(400).send('Error in database operation');
    } else {
      response.send(results);
    }
  });
});

router.get('/wellret', function(request, response) {
  let poolcode = request.query.poolcode;
  conn.query("SELECT * FROM welltesting WHERE (`poolBarcode` = \'" + poolcode + "\')", function(error, results) {
    if (error) {
      response.status(400).send('Error in database operation');
    } else {
      response.send(results);
    }
  });
});


module.exports = router;