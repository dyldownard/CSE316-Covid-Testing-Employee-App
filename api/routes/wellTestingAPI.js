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

router.get('/create', function(request, response) { //creates a new pool in pool table
  let wellcode = request.query.wellcode;
  conn.query("INSERT INTO well VALUES (\'" + wellcode + "\');", function(error, results) {
    if (error) {
      if (error.errno === 1062) {
        response.status(450).send(results);
      } else {
        response.status(400).send(results);
      }
    } else {
      response.send(results);
    }
  });
});

router.get('/submit', function(request, response) { //enters in a bunch of testids for poolcode into poolmap
  let poolcode = request.query.poolcode;
  let wellcode = request.query.wellcode;
  let result = request.query.result;
  conn.query("INSERT INTO welltesting VALUES (" + poolcode + ", " + wellcode + ", null, null, \'" + result + "\');", function(error, results) {
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

//DELETE FROM `covid-test`.`welltesting` WHERE (`poolBarcode` = '555');
router.get('/del', function(request, response) {
  let poolcode = request.query.poolcode;
  conn.query("DELETE FROM `covid-test`.`welltesting` WHERE (`poolBarcode` = \'" + poolcode + "\');", function(error, results) {
    if (error) {
      response.status(400).send(results);
    } else {
      response.send(results);
    }
  });
});

//UPDATE `covid-test`.`welltesting` SET `result` = 'Positive' WHERE (`poolBarcode` = '555');
router.get('/edit', function(request, response) {
  let poolcode = request.query.poolcode;
  let result = request.query.result;
  conn.query("UPDATE `covid-test`.`welltesting` SET `result` = \'" + result + "\' WHERE (`poolBarcode` = \'" + poolcode + "\');", function(error, results) {
    if (error) {
      response.status(400).send(results);
    } else {
      response.send(results);
    }
  });
});

module.exports = router;