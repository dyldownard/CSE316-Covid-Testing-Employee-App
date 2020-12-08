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
  conn.query("SELECT * FROM employeetest", function(error, results) {
    if (error) {
      response.status(400).send('Error in database operation');
    } else {
      response.send(results);
    }
  });
});


router.get('/add', function(request, response) {
  let empid = request.query.empid;
  let testid = request.query.testid;
  conn.query("INSERT INTO `covid-test`.`employeetest` (`testBarcode`, `employeeID`) VALUES (\'" + testid + "\', \'" + empid + "\');", function(error, results) {
    if (error) {
      if (error.errno === 1062) {
        response.status(450).send(results);
      } else if (error.errno === 1452) {
        response.status(451).send(results);
      } else {
        response.status(400).send(results);
      }
    } else {
      response.send(results);
    }
  });
});

router.get('/del', function(request, response) {
  let testid = request.query.testid;
  conn.query("DELETE FROM `covid-test`.`employeetest` WHERE (`testBarcode` = \'" + testid + "\');", function(error, results) {
    if (error) {
      response.status(400).send('Error in database operation');
    } else {
      response.send(results);
    }
  });
});



module.exports = router;