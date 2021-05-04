const express = require('express');
const app = express();

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database:'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) values('Wesley')`;
connection.query(sql);
connection.end();

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/people', function(req, res) {
  let people = [];
  const connection = mysql.createConnection(config);
  connection.query("SELECT * FROM people", function (err, result, fields) {
    if (err) {
      console.log(err)
      throw err;
    }
    people = result;
    res.send(people);
  });
  connection.end();  
});

const port = "8888";
app.listen(port);

console.log("Node HTTP Server started at http://localhost:8888/");