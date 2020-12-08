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
  conn.query("SELECT * FROM poolmap", function(error, results) {
    if (error) {
      response.status(400).send('Error in database operation');
    } else {
      response.send(results);
    }
  });
});

//INSERT INTO `covid-test`.poolmap VALUES (111,556), (112, 556); (ie we build a string containing (testid, poolcode))
router.get('/submit', function(request, response) { //enters in a bunch of testids for poolcode into poolmap
  let poolcode = request.query.poolcode;
  let testids = request.query.testids;
  //build string here
  let nums = testids.split(',');
  let str = "";
  for (var i = 0; i < nums.length; i++) {
    str = str + "(" + nums[i] + "," + poolcode + ")"
    if (i !== nums.length - 1) {
      str = str + ", "
    }
  }

  conn.query("INSERT INTO poolmap VALUES" + str + ";", function(error, results) {
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

//INSERT INTO `covid-test`.`pool` (`poolBarcode`) VALUES ('555');
router.get('/create', function(request, response) { //creates a new pool in pool table
  let poolcode = request.query.poolcode;
  conn.query("INSERT INTO pool VALUES (\'" + poolcode + "\');", function(error, results) {
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

router.get('/del', function(request, response) {
  let poolcode = request.query.poolcode;
  let testids = request.query.testids;
  let nums = testids.split(',');
  let str = "";
  for (var i = 0; i < nums.length; i++) {
    str = str + "(" + nums[i] + "," + poolcode + ")"
    if (i !== nums.length - 1) {
      str = str + ", "
    }
  }
  conn.query("DELETE FROM `covid-test`.`poolmap` WHERE (testBarcode, poolBarcode) IN (" + str + ");", function(error, results) {
    if (error) {
      response.status(400).send(results);
    } else {
      response.send(results);
    }
  });
});

router.get('/poolret', function(request, response) { //returns all entries from poolmap for a given poolcode
  let poolcode = request.query.poolcode;
  conn.query("SELECT * FROM poolmap WHERE poolBarcode=" + poolcode, function(error, results) {
    if (error) {
      response.status(400).send(results);
    } else {
      response.send(results);
    }
  });
});

router.get('/pooldel', function(request, response) {
  let poolcode = request.query.poolcode;
  conn.query("DELETE FROM `covid-test`.`pool` WHERE (poolBarcode = " + poolcode + ");", function(error, results) {
    if (error) {
      response.status(400).send(results);
    } else {
      response.send(results);
    }
  });
});

router.get('/editdel', function(request, response) {
  let poolcode = request.query.poolcode;
  conn.query("DELETE FROM `covid-test`.`poolmap` WHERE (poolBarcode = " + poolcode + ");", function(error, results) {
    if (error) {
      response.status(400).send(results);
    } else {
      response.send(results);
    }
  });
});


module.exports = router;