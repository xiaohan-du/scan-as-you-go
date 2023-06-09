const mysql = require('mysql');
const express = require('express');
const app = express();

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'comsc'
});

con.connect(function(err) {
  if (err) throw err;
  const dbName = 'scanAsYouGo';
  const barcodesTable = 'barcodes';
  console.log("Connected!");
  con.query(`DROP DATABASE IF EXISTS ${dbName}`, function (err, result) {
    if (err) throw err;
    console.log(`Database ${dbName} dropped`);
  });
  con.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, function (err, result) {
    if (err) throw err;
    console.log(`Database ${dbName} created`);
  });
  con.query(`USE ${dbName}`, function (err, result) {
    if (err) throw err;
    console.log(`Database ${dbName} selected`);
  });
  con.query(`CREATE TABLE IF NOT EXISTS ${barcodesTable} (id INT AUTO_INCREMENT PRIMARY KEY, code VARCHAR(255))`, function (err, result) {
    if (err) throw err;
    console.log(`Table ${barcodesTable} created`);
  });
  con.query(`INSERT INTO ${barcodesTable} (code) VALUES ('123456789'), ('987654321'), ('543216789')`, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) inserted");
  });
});

app.get('/barcodes', function (req, res) {
  con.query('SELECT * FROM barcodes', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

app.listen(3000, '0.0.0.0', function () {
  console.log('server started on port 3000');
});